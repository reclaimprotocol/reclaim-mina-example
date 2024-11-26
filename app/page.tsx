"use client";
import { Field } from "o1js";
import { useEffect, useState } from "react";
import GradientBG from "../components/GradientBG";
import styles from "../styles/Home.module.css";
import ZkappWorkerClient from "./zkappWorkerClient";
import { ReclaimProofRequest, Proof } from "@reclaimprotocol/js-sdk";
import QRCode from "react-qr-code";

let transactionFee = 0.1;
const ZKAPP_ADDRESS = "B62qo2bG8whoeYT3dsRBH1k4ErWzMBWQYWP8xSvMKeHUdaYY3ApUb6p";

export default function Home() {
  const [zkappWorkerClient, setZkappWorkerClient] =
    useState<null | ZkappWorkerClient>(null);
  const [hasWallet, setHasWallet] = useState<null | boolean>(null);
  const [hasBeenSetup, setHasBeenSetup] = useState(false);
  const [accountExists, setAccountExists] = useState(false);
  const [currentProofNum, setcurrentProofNum] = useState<null | string>(null);
  const [publicKeyBase58, setPublicKeyBase58] = useState("");
  const [creatingTransaction, setCreatingTransaction] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [transactionlink, setTransactionLink] = useState("");
  const [url, setUrl] = useState("");
  const [ready, setReady] = useState(false);
  const [Rproof, setRProof] = useState<null | Proof>(null);
  const [loading, setLoading] = useState(false);
  const [reclaimProofRequest, setReclaimProofRequest] = useState(null);
  const [statusUrl, setStatusUrl] = useState("");

  const displayStep = (step: string) => {
    setDisplayText(step);
    console.log(step);
  };

  // -------------------------------------------------------
  // Do Setup

  useEffect(() => {
    const setup = async () => {
      try {
        if (!hasBeenSetup) {
          displayStep("Loading web worker...");
          const zkappWorkerClient = new ZkappWorkerClient();
          setZkappWorkerClient(zkappWorkerClient);
          await new Promise((resolve) => setTimeout(resolve, 5000));
          displayStep("Done loading web worker");

          await zkappWorkerClient.setActiveInstanceToDevnet();

          const mina = (window as any).mina;
          if (mina == null) {
            setHasWallet(false);
            displayStep("Wallet not found.");
            return;
          }

          const publicKeyBase58: string = (await mina.requestAccounts())[0];
          setPublicKeyBase58(publicKeyBase58);
          displayStep(`Using key:${publicKeyBase58}`);

          displayStep("Checking if fee payer account exists...");
          const res = await zkappWorkerClient.fetchAccount(publicKeyBase58);
          const accountExists = res.error === null;
          setAccountExists(accountExists);

          await zkappWorkerClient.loadContract();

          displayStep("Compiling zkApp...");
          await zkappWorkerClient.compileContract();
          displayStep("zkApp compiled");

          await zkappWorkerClient.initZkappInstance(ZKAPP_ADDRESS);

          displayStep("Getting Number of Proofs...");
          await zkappWorkerClient.fetchAccount(ZKAPP_ADDRESS);
          const currentProofNum = await zkappWorkerClient.getProofNum();
          setcurrentProofNum(currentProofNum);
          console.log(`Current Proof Num in zkApp: ${currentProofNum}`);

          async function initializeReclaim() {
            const APP_ID = "0x6E0338a6D8594101Ea9e13840449242015d71B19"; // This is an example App Id Replace it with your App Id.
            const APP_SECRET =
              "0x1e0d6a6548b72286d747b4ac9f2ad6b07eba8ad6a99cb1191890ea3f77fae48f"; // This is an example App Secret Replace it with your App Secret.
            const PROVIDER_ID = "6d3f6753-7ee6-49ee-a545-62f1b1822ae5"; // This is GitHub Provider Id Replace it with the provider id you want to use.

            const proofRequest = await ReclaimProofRequest.init(
              APP_ID,
              APP_SECRET,
              PROVIDER_ID
            );
            // @ts-ignore
            setReclaimProofRequest(proofRequest);
          }
          console.log("Initlizing Reclaim...");
          initializeReclaim();
          setHasBeenSetup(true);
          setHasWallet(true);
          setDisplayText("");
        }
      } catch (error: any) {
        displayStep(`Error during setup: ${error.message}`);
      }
    };

    setup();
  }, []);

  // -------------------------------------------------------
  // Wait for account to exist, if it didn't

  useEffect(() => {
    const checkAccountExists = async () => {
      if (hasBeenSetup && !accountExists) {
        try {
          for (;;) {
            displayStep("Checking if fee payer account exists...");

            const res = await zkappWorkerClient!.fetchAccount(publicKeyBase58);
            const accountExists = res.error == null;
            if (accountExists) {
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 5000));
          }
        } catch (error: any) {
          displayStep(`Error checking account: ${error.message}`);
        }
      }
      setAccountExists(true);
    };

    checkAccountExists();
  }, [zkappWorkerClient, hasBeenSetup, accountExists]);

  // -------------------------------------------------------
  // Generate Verification Request

  async function generateVerificationRequest() {
    setLoading(true);
    if (!reclaimProofRequest) {
      console.error("Reclaim Proof Request not initialized");
      return;
    }
    // @ts-ignore
    reclaimProofRequest.addContext(
      `user's address`,
      "for acmecorp.com on 1st january"
    );
    // @ts-ignore
    const url = await reclaimProofRequest.getRequestUrl();
    setUrl(url);
    // @ts-ignore
    const status = reclaimProofRequest.getStatusUrl();
    setStatusUrl(status);

    setLoading(false);

    // @ts-ignore
    await reclaimProofRequest.startSession({
      onSuccess: (proof: Proof) => {
        console.log("Verification success", proof);
        setRProof(proof);
        setReady(true);
      },
      onFailure: (error: Error) => {
        console.error("Verification failed", error);
        setLoading(false);
      },
    });
  }

  // -------------------------------------------------------
  // Send a transaction

  const onSendTransaction = async (proof: Proof) => {
    setCreatingTransaction(true);
    displayStep("Creating a transaction...");
    console.log("publicKeyBase58 sending to worker", publicKeyBase58);
    await zkappWorkerClient!.fetchAccount(publicKeyBase58);
    await zkappWorkerClient!.createTransaction(proof);
    displayStep("Creating proof...");
    await zkappWorkerClient!.proveUpdateTransaction();
    displayStep("Requesting send transaction...");
    const transactionJSON = await zkappWorkerClient!.getTransactionJSON();
    displayStep("Getting transaction JSON...");
    // console.log("transactionJSON IN PAGE>TSX", transactionJSON);
    const { hash } = await (window as any).mina.sendTransaction({
      transaction: transactionJSON,
      feePayer: {
        fee: transactionFee,
        memo: "",
      },
    });
    const transactionLink = `https://minascan.io/devnet/tx/${hash}`;
    setTransactionLink(transactionLink);
    setDisplayText(transactionLink);
    setCreatingTransaction(true);
  };

  // -------------------------------------------------------
  // Refresh the current state

  const onRefreshcurrentProofNum = async () => {
    try {
      displayStep("Getting zkApp state...");
      await zkappWorkerClient!.fetchAccount(ZKAPP_ADDRESS);
      const currentProofNum = await zkappWorkerClient!.getProofNum();
      setcurrentProofNum(currentProofNum);
      console.log(`Proofs verified in zkApp: ${currentProofNum}`);
      setDisplayText("");
    } catch (error: any) {
      displayStep(`Error refreshing state: ${error.message}`);
    }
  };

  // -------------------------------------------------------
  // Create UI elements

  let auroLinkElem;
  if (hasWallet === false) {
    const auroLink = "https://www.aurowallet.com/";
    auroLinkElem = (
      <div>
        Could not find a wallet.{" "}
        <a href="https://www.aurowallet.com/" target="_blank" rel="noreferrer">
          Install Auro wallet here
        </a>
      </div>
    );
  }

  const stepDisplay = transactionlink ? (
    <a
      href={transactionlink}
      target="_blank"
      rel="noreferrer"
      style={{ textDecoration: "underline" }}
    >
      View transaction
    </a>
  ) : (
    displayText
  );

  let setup = (
    <div
      className={styles.start}
      style={{ fontWeight: "bold", fontSize: "1.5rem", paddingBottom: "5rem" }}
    >
      {stepDisplay}
      {auroLinkElem}
    </div>
  );

  let accountDoesNotExist;
  if (hasBeenSetup && !accountExists) {
    const faucetLink = `https://faucet.minaprotocol.com/?address='${publicKeyBase58}`;
    accountDoesNotExist = (
      <div>
        <span style={{ paddingRight: "1rem" }}>Account does not exist.</span>
        <a href={faucetLink} target="_blank" rel="noreferrer">
          Visit the faucet to fund this fee payer account
        </a>
      </div>
    );
  }

  let mainContent;
  if (hasBeenSetup && accountExists) {
    mainContent = (
      <div className="flex flex-col align-middle items-center">
        <div className="text-3xl" style={{ padding: 0 }}>
          Proofs Verified in zkApp until now: {currentProofNum}
        </div>
        {ready && (
          <button
            className={styles.card}
            // @ts-ignore
            onClick={() => onSendTransaction(Rproof)}
            disabled={creatingTransaction}
          >
            Verify Proof
          </button>
        )}
        {!ready && (
          <button className={styles.card} onClick={generateVerificationRequest}>
            Create Claim QrCode
          </button>
        )}

        {url && !ready && <QRCode value={url} />}
      </div>
    );
  }

  return (
    <GradientBG>
      <div className={styles.main} style={{ padding: 0 }}>
        <div className={styles.center} style={{ padding: 0 }}>
          {setup}
          {accountDoesNotExist}
          {mainContent}
        </div>
      </div>
    </GradientBG>
  );
}
