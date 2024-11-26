import { Field, Mina, PublicKey, fetchAccount } from "o1js";
import * as Comlink from "comlink";
import {
  Reclaim,
  Proof as RProof,
  Claim,
  ClaimInfo,
  SignedClaim,
} from "../components/abi/src/Reclaim";
import { Proof } from "@reclaimprotocol/js-sdk";

type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

const state = {
  AddInstance: null as null | typeof Reclaim,
  zkappInstance: null as null | Reclaim,
  transaction: null as null | Transaction,
};

export const api = {
  async setActiveInstanceToDevnet() {
    const Network = Mina.Network(
      "https://api.minascan.io/node/devnet/v1/graphql"
    );
    console.log("Devnet network instance configured");
    Mina.setActiveInstance(Network);
  },
  async loadContract() {
    const { Reclaim } = await import("../components/abi/src/Reclaim");
    state.AddInstance = Reclaim;
  },
  async compileContract() {
    await state.AddInstance!.compile();
  },
  async fetchAccount(publicKey58: string) {
    const publicKey = PublicKey.fromBase58(publicKey58);
    return fetchAccount({ publicKey });
  },
  async initZkappInstance(publicKey58: string) {
    const publicKey = PublicKey.fromBase58(publicKey58);
    state.zkappInstance = new state.AddInstance!(publicKey);
  },
  async getProofNum() {
    const currentNum = await state.zkappInstance!.proofNum.get();
    return JSON.stringify(currentNum.toJSON());
  },

  async createTransaction(proofData: Proof) {
    console.log("Worker: Creating transaction...");

    // Helper function to convert hex strings to Fields
    function hexToField(hexString: string): Field {
      if (!hexString.startsWith("0x")) {
        hexString = "0x" + hexString;
      }
      return Field(BigInt(hexString));
    }

    // Reconstruct ClaimInfo
    const claimInfo = new ClaimInfo({
      provider: proofData.claimData.provider,
      parameters: proofData.claimData.parameters,
      context: proofData.claimData.context,
    });

    // Convert identifierField
    const identifierField = hexToField(proofData.identifier);

    // Convert owner to Field
    const ownerField = hexToField(proofData.claimData.owner);

    // Convert timestampS to Field
    const timestampField = Field(proofData.claimData.timestampS);

    // Reconstruct Claim
    const claim = new Claim({
      epoch: Field(proofData.claimData.epoch),
      identifier: proofData.claimData.identifier,
      identifierField: identifierField,
      owner: ownerField,
      timestampS: timestampField,
    });

    // Convert signers to an array of Fields
    const signersFields = proofData.witnesses.map((witness) =>
      hexToField(witness.id)
    );

    // Reconstruct SignedClaim
    const signedClaim = new SignedClaim({
      claim: claim,
      signatures: proofData.signatures,
      signers: signersFields[0],
    });

    // Reconstruct RProof
    const rProof = new RProof({
      claimInfo: claimInfo,
      signedClaim: signedClaim,
    });

    // Create the transaction using rProof
    state.transaction = await Mina.transaction(async () => {
      await state.zkappInstance!.verifyProof(rProof);
    });

    console.log("Worker: Transaction created.");
  },

  async proveUpdateTransaction() {
    console.log("Worker: Proving transaction...");
    await state.transaction!.prove();
    console.log("Worker: Proof generated.");
  },
  async getTransactionJSON() {
    try {
      const txJSON = state.transaction!.toJSON();
      return txJSON;
    } catch (error) {
      console.error("Worker: Error getting transaction JSON:", error);
      throw error;
    }
  },
};

// Expose the API to be used by the main thread
Comlink.expose(api);
