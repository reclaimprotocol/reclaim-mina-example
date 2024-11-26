import { Field, SmartContract, UInt32, State, PublicKey } from 'o1js';
declare const ClaimInfo_base: (new (value: {
    provider: string;
    parameters: string;
    context: string;
}) => {
    provider: string;
    parameters: string;
    context: string;
}) & {
    _isStruct: true;
} & import("o1js").Provable<{
    provider: string;
    parameters: string;
    context: string;
}, {
    provider: string;
    parameters: string;
    context: string;
}> & {
    fromValue: (value: {
        provider: string;
        parameters: string;
        context: string;
    }) => {
        provider: string;
        parameters: string;
        context: string;
    };
    toInput: (x: {
        provider: string;
        parameters: string;
        context: string;
    }) => {
        fields?: Field[] | undefined;
        packed?: [Field, number][] | undefined;
    };
    toJSON: (x: {
        provider: string;
        parameters: string;
        context: string;
    }) => {
        provider: string;
        parameters: string;
        context: string;
    };
    fromJSON: (x: {
        provider: string;
        parameters: string;
        context: string;
    }) => {
        provider: string;
        parameters: string;
        context: string;
    };
    empty: () => {
        provider: string;
        parameters: string;
        context: string;
    };
};
export declare class ClaimInfo extends ClaimInfo_base {
}
declare const Claim_base: (new (value: {
    epoch: import("o1js/dist/node/lib/provable/field").Field;
    identifier: string;
    identifierField: import("o1js/dist/node/lib/provable/field").Field;
    owner: import("o1js/dist/node/lib/provable/field").Field;
    timestampS: import("o1js/dist/node/lib/provable/field").Field;
}) => {
    epoch: import("o1js/dist/node/lib/provable/field").Field;
    identifier: string;
    identifierField: import("o1js/dist/node/lib/provable/field").Field;
    owner: import("o1js/dist/node/lib/provable/field").Field;
    timestampS: import("o1js/dist/node/lib/provable/field").Field;
}) & {
    _isStruct: true;
} & import("o1js").Provable<{
    epoch: import("o1js/dist/node/lib/provable/field").Field;
    identifier: string;
    identifierField: import("o1js/dist/node/lib/provable/field").Field;
    owner: import("o1js/dist/node/lib/provable/field").Field;
    timestampS: import("o1js/dist/node/lib/provable/field").Field;
}, {
    epoch: bigint;
    identifier: string;
    identifierField: bigint;
    owner: bigint;
    timestampS: bigint;
}> & {
    fromValue: (value: {
        epoch: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
        identifier: string;
        identifierField: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
        owner: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
        timestampS: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
    }) => {
        epoch: import("o1js/dist/node/lib/provable/field").Field;
        identifier: string;
        identifierField: import("o1js/dist/node/lib/provable/field").Field;
        owner: import("o1js/dist/node/lib/provable/field").Field;
        timestampS: import("o1js/dist/node/lib/provable/field").Field;
    };
    toInput: (x: {
        epoch: import("o1js/dist/node/lib/provable/field").Field;
        identifier: string;
        identifierField: import("o1js/dist/node/lib/provable/field").Field;
        owner: import("o1js/dist/node/lib/provable/field").Field;
        timestampS: import("o1js/dist/node/lib/provable/field").Field;
    }) => {
        fields?: Field[] | undefined;
        packed?: [Field, number][] | undefined;
    };
    toJSON: (x: {
        epoch: import("o1js/dist/node/lib/provable/field").Field;
        identifier: string;
        identifierField: import("o1js/dist/node/lib/provable/field").Field;
        owner: import("o1js/dist/node/lib/provable/field").Field;
        timestampS: import("o1js/dist/node/lib/provable/field").Field;
    }) => {
        epoch: string;
        identifier: string;
        identifierField: string;
        owner: string;
        timestampS: string;
    };
    fromJSON: (x: {
        epoch: string;
        identifier: string;
        identifierField: string;
        owner: string;
        timestampS: string;
    }) => {
        epoch: import("o1js/dist/node/lib/provable/field").Field;
        identifier: string;
        identifierField: import("o1js/dist/node/lib/provable/field").Field;
        owner: import("o1js/dist/node/lib/provable/field").Field;
        timestampS: import("o1js/dist/node/lib/provable/field").Field;
    };
    empty: () => {
        epoch: import("o1js/dist/node/lib/provable/field").Field;
        identifier: string;
        identifierField: import("o1js/dist/node/lib/provable/field").Field;
        owner: import("o1js/dist/node/lib/provable/field").Field;
        timestampS: import("o1js/dist/node/lib/provable/field").Field;
    };
};
export declare class Claim extends Claim_base {
}
declare const SignedClaim_base: (new (value: {
    claim: Claim;
    signatures: string[];
    signers: import("o1js/dist/node/lib/provable/field").Field;
}) => {
    claim: Claim;
    signatures: string[];
    signers: import("o1js/dist/node/lib/provable/field").Field;
}) & {
    _isStruct: true;
} & import("o1js").Provable<{
    claim: Claim;
    signatures: string[];
    signers: import("o1js/dist/node/lib/provable/field").Field;
}, {
    claim: {
        epoch: bigint;
        identifier: string;
        identifierField: bigint;
        owner: bigint;
        timestampS: bigint;
    };
    signatures: string[];
    signers: bigint;
}> & {
    fromValue: (value: {
        claim: Claim | {
            epoch: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
            identifier: string;
            identifierField: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
            owner: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
            timestampS: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
        };
        signatures: string[];
        signers: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
    }) => {
        claim: Claim;
        signatures: string[];
        signers: import("o1js/dist/node/lib/provable/field").Field;
    };
    toInput: (x: {
        claim: Claim;
        signatures: string[];
        signers: import("o1js/dist/node/lib/provable/field").Field;
    }) => {
        fields?: Field[] | undefined;
        packed?: [Field, number][] | undefined;
    };
    toJSON: (x: {
        claim: Claim;
        signatures: string[];
        signers: import("o1js/dist/node/lib/provable/field").Field;
    }) => {
        claim: {
            epoch: string;
            identifier: string;
            identifierField: string;
            owner: string;
            timestampS: string;
        };
        signatures: string[];
        signers: string;
    };
    fromJSON: (x: {
        claim: {
            epoch: string;
            identifier: string;
            identifierField: string;
            owner: string;
            timestampS: string;
        };
        signatures: string[];
        signers: string;
    }) => {
        claim: Claim;
        signatures: string[];
        signers: import("o1js/dist/node/lib/provable/field").Field;
    };
    empty: () => {
        claim: Claim;
        signatures: string[];
        signers: import("o1js/dist/node/lib/provable/field").Field;
    };
};
export declare class SignedClaim extends SignedClaim_base {
}
declare const Proof_base: (new (value: {
    claimInfo: ClaimInfo;
    signedClaim: SignedClaim;
}) => {
    claimInfo: ClaimInfo;
    signedClaim: SignedClaim;
}) & {
    _isStruct: true;
} & import("o1js").Provable<{
    claimInfo: ClaimInfo;
    signedClaim: SignedClaim;
}, {
    claimInfo: {
        provider: string;
        parameters: string;
        context: string;
    };
    signedClaim: {
        claim: {
            epoch: bigint;
            identifier: string;
            identifierField: bigint;
            owner: bigint;
            timestampS: bigint;
        };
        signatures: string[];
        signers: bigint;
    };
}> & {
    fromValue: (value: {
        claimInfo: ClaimInfo | {
            provider: string;
            parameters: string;
            context: string;
        };
        signedClaim: SignedClaim | {
            claim: Claim | {
                epoch: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
                identifier: string;
                identifierField: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
                owner: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
                timestampS: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
            };
            signatures: string[];
            signers: string | number | bigint | import("o1js/dist/node/lib/provable/field").Field;
        };
    }) => {
        claimInfo: ClaimInfo;
        signedClaim: SignedClaim;
    };
    toInput: (x: {
        claimInfo: ClaimInfo;
        signedClaim: SignedClaim;
    }) => {
        fields?: Field[] | undefined;
        packed?: [Field, number][] | undefined;
    };
    toJSON: (x: {
        claimInfo: ClaimInfo;
        signedClaim: SignedClaim;
    }) => {
        claimInfo: {
            provider: string;
            parameters: string;
            context: string;
        };
        signedClaim: {
            claim: {
                epoch: string;
                identifier: string;
                identifierField: string;
                owner: string;
                timestampS: string;
            };
            signatures: string[];
            signers: string;
        };
    };
    fromJSON: (x: {
        claimInfo: {
            provider: string;
            parameters: string;
            context: string;
        };
        signedClaim: {
            claim: {
                epoch: string;
                identifier: string;
                identifierField: string;
                owner: string;
                timestampS: string;
            };
            signatures: string[];
            signers: string;
        };
    }) => {
        claimInfo: ClaimInfo;
        signedClaim: SignedClaim;
    };
    empty: () => {
        claimInfo: ClaimInfo;
        signedClaim: SignedClaim;
    };
};
export declare class Proof extends Proof_base {
}
export declare class Reclaim extends SmartContract {
    currentEpoch: State<UInt32>;
    owner: State<PublicKey>;
    witnessesRoot: State<import("o1js/dist/node/lib/provable/field").Field>;
    proofNum: State<import("o1js/dist/node/lib/provable/field").Field>;
    init(): void;
    verifyProof(proof: Proof): Promise<void>;
}
export {};
