type ErrorWithCode = Error & { code: number };
type MaybeErrorWithCode = ErrorWithCode | null | undefined;

const createErrorFromCodeLookup: Map<number, () => ErrorWithCode> = new Map();
const createErrorFromNameLookup: Map<string, () => ErrorWithCode> = new Map();

/**
 * InstructionUnpackError: ''
 *
 * @category Errors
 * @category generated
 */
export class InstructionUnpackErrorError extends Error {
  readonly code: number = 0x0;
  readonly name: string = 'InstructionUnpackError';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InstructionUnpackErrorError);
    }
  }
}

createErrorFromCodeLookup.set(0x0, () => new InstructionUnpackErrorError());
createErrorFromNameLookup.set(
  'InstructionUnpackError',
  () => new InstructionUnpackErrorError()
);

/**
 * InstructionPackError: ''
 *
 * @category Errors
 * @category generated
 */
export class InstructionPackErrorError extends Error {
  readonly code: number = 0x1;
  readonly name: string = 'InstructionPackError';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InstructionPackErrorError);
    }
  }
}

createErrorFromCodeLookup.set(0x1, () => new InstructionPackErrorError());
createErrorFromNameLookup.set(
  'InstructionPackError',
  () => new InstructionPackErrorError()
);

/**
 * NotRentExempt: 'Lamport balance below rent-exempt threshold'
 *
 * @category Errors
 * @category generated
 */
export class NotRentExemptError extends Error {
  readonly code: number = 0x2;
  readonly name: string = 'NotRentExempt';
  constructor() {
    super('Lamport balance below rent-exempt threshold');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NotRentExemptError);
    }
  }
}

createErrorFromCodeLookup.set(0x2, () => new NotRentExemptError());
createErrorFromNameLookup.set('NotRentExempt', () => new NotRentExemptError());

/**
 * AlreadyInitialized: 'Already initialized'
 *
 * @category Errors
 * @category generated
 */
export class AlreadyInitializedError extends Error {
  readonly code: number = 0x3;
  readonly name: string = 'AlreadyInitialized';
  constructor() {
    super('Already initialized');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, AlreadyInitializedError);
    }
  }
}

createErrorFromCodeLookup.set(0x3, () => new AlreadyInitializedError());
createErrorFromNameLookup.set(
  'AlreadyInitialized',
  () => new AlreadyInitializedError()
);

/**
 * Uninitialized: 'Uninitialized'
 *
 * @category Errors
 * @category generated
 */
export class UninitializedError extends Error {
  readonly code: number = 0x4;
  readonly name: string = 'Uninitialized';
  constructor() {
    super('Uninitialized');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, UninitializedError);
    }
  }
}

createErrorFromCodeLookup.set(0x4, () => new UninitializedError());
createErrorFromNameLookup.set('Uninitialized', () => new UninitializedError());

/**
 * InvalidMetadataKey: ' Metadata's key must match seed of ['metadata', program id, mint] provided'
 *
 * @category Errors
 * @category generated
 */
export class InvalidMetadataKeyError extends Error {
  readonly code: number = 0x5;
  readonly name: string = 'InvalidMetadataKey';
  constructor() {
    super(
      " Metadata's key must match seed of ['metadata', program id, mint] provided"
    );
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidMetadataKeyError);
    }
  }
}

createErrorFromCodeLookup.set(0x5, () => new InvalidMetadataKeyError());
createErrorFromNameLookup.set(
  'InvalidMetadataKey',
  () => new InvalidMetadataKeyError()
);

/**
 * InvalidEditionKey: 'Edition's key must match seed of ['metadata', program id, name, 'edition'] provided'
 *
 * @category Errors
 * @category generated
 */
export class InvalidEditionKeyError extends Error {
  readonly code: number = 0x6;
  readonly name: string = 'InvalidEditionKey';
  constructor() {
    super(
      "Edition's key must match seed of ['metadata', program id, name, 'edition'] provided"
    );
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidEditionKeyError);
    }
  }
}

createErrorFromCodeLookup.set(0x6, () => new InvalidEditionKeyError());
createErrorFromNameLookup.set(
  'InvalidEditionKey',
  () => new InvalidEditionKeyError()
);

/**
 * UpdateAuthorityIncorrect: 'Update Authority given does not match'
 *
 * @category Errors
 * @category generated
 */
export class UpdateAuthorityIncorrectError extends Error {
  readonly code: number = 0x7;
  readonly name: string = 'UpdateAuthorityIncorrect';
  constructor() {
    super('Update Authority given does not match');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, UpdateAuthorityIncorrectError);
    }
  }
}

createErrorFromCodeLookup.set(0x7, () => new UpdateAuthorityIncorrectError());
createErrorFromNameLookup.set(
  'UpdateAuthorityIncorrect',
  () => new UpdateAuthorityIncorrectError()
);

/**
 * UpdateAuthorityIsNotSigner: 'Update Authority needs to be signer to update metadata'
 *
 * @category Errors
 * @category generated
 */
export class UpdateAuthorityIsNotSignerError extends Error {
  readonly code: number = 0x8;
  readonly name: string = 'UpdateAuthorityIsNotSigner';
  constructor() {
    super('Update Authority needs to be signer to update metadata');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, UpdateAuthorityIsNotSignerError);
    }
  }
}

createErrorFromCodeLookup.set(0x8, () => new UpdateAuthorityIsNotSignerError());
createErrorFromNameLookup.set(
  'UpdateAuthorityIsNotSigner',
  () => new UpdateAuthorityIsNotSignerError()
);

/**
 * NotMintAuthority: 'You must be the mint authority and signer on this transaction'
 *
 * @category Errors
 * @category generated
 */
export class NotMintAuthorityError extends Error {
  readonly code: number = 0x9;
  readonly name: string = 'NotMintAuthority';
  constructor() {
    super('You must be the mint authority and signer on this transaction');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NotMintAuthorityError);
    }
  }
}

createErrorFromCodeLookup.set(0x9, () => new NotMintAuthorityError());
createErrorFromNameLookup.set(
  'NotMintAuthority',
  () => new NotMintAuthorityError()
);

/**
 * InvalidMintAuthority: 'Mint authority provided does not match the authority on the mint'
 *
 * @category Errors
 * @category generated
 */
export class InvalidMintAuthorityError extends Error {
  readonly code: number = 0xa;
  readonly name: string = 'InvalidMintAuthority';
  constructor() {
    super('Mint authority provided does not match the authority on the mint');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidMintAuthorityError);
    }
  }
}

createErrorFromCodeLookup.set(0xa, () => new InvalidMintAuthorityError());
createErrorFromNameLookup.set(
  'InvalidMintAuthority',
  () => new InvalidMintAuthorityError()
);

/**
 * NameTooLong: 'Name too long'
 *
 * @category Errors
 * @category generated
 */
export class NameTooLongError extends Error {
  readonly code: number = 0xb;
  readonly name: string = 'NameTooLong';
  constructor() {
    super('Name too long');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NameTooLongError);
    }
  }
}

createErrorFromCodeLookup.set(0xb, () => new NameTooLongError());
createErrorFromNameLookup.set('NameTooLong', () => new NameTooLongError());

/**
 * SymbolTooLong: 'Symbol too long'
 *
 * @category Errors
 * @category generated
 */
export class SymbolTooLongError extends Error {
  readonly code: number = 0xc;
  readonly name: string = 'SymbolTooLong';
  constructor() {
    super('Symbol too long');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SymbolTooLongError);
    }
  }
}

createErrorFromCodeLookup.set(0xc, () => new SymbolTooLongError());
createErrorFromNameLookup.set('SymbolTooLong', () => new SymbolTooLongError());

/**
 * UriTooLong: 'URI too long'
 *
 * @category Errors
 * @category generated
 */
export class UriTooLongError extends Error {
  readonly code: number = 0xd;
  readonly name: string = 'UriTooLong';
  constructor() {
    super('URI too long');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, UriTooLongError);
    }
  }
}

createErrorFromCodeLookup.set(0xd, () => new UriTooLongError());
createErrorFromNameLookup.set('UriTooLong', () => new UriTooLongError());

/**
 * UpdateAuthorityMustBeEqualToMetadataAuthorityAndSigner: ''
 *
 * @category Errors
 * @category generated
 */
export class UpdateAuthorityMustBeEqualToMetadataAuthorityAndSignerError extends Error {
  readonly code: number = 0xe;
  readonly name: string =
    'UpdateAuthorityMustBeEqualToMetadataAuthorityAndSigner';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        UpdateAuthorityMustBeEqualToMetadataAuthorityAndSignerError
      );
    }
  }
}

createErrorFromCodeLookup.set(
  0xe,
  () => new UpdateAuthorityMustBeEqualToMetadataAuthorityAndSignerError()
);
createErrorFromNameLookup.set(
  'UpdateAuthorityMustBeEqualToMetadataAuthorityAndSigner',
  () => new UpdateAuthorityMustBeEqualToMetadataAuthorityAndSignerError()
);

/**
 * MintMismatch: 'Mint given does not match mint on Metadata'
 *
 * @category Errors
 * @category generated
 */
export class MintMismatchError extends Error {
  readonly code: number = 0xf;
  readonly name: string = 'MintMismatch';
  constructor() {
    super('Mint given does not match mint on Metadata');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MintMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(0xf, () => new MintMismatchError());
createErrorFromNameLookup.set('MintMismatch', () => new MintMismatchError());

/**
 * EditionsMustHaveExactlyOneToken: 'Editions must have exactly one token'
 *
 * @category Errors
 * @category generated
 */
export class EditionsMustHaveExactlyOneTokenError extends Error {
  readonly code: number = 0x10;
  readonly name: string = 'EditionsMustHaveExactlyOneToken';
  constructor() {
    super('Editions must have exactly one token');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, EditionsMustHaveExactlyOneTokenError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x10,
  () => new EditionsMustHaveExactlyOneTokenError()
);
createErrorFromNameLookup.set(
  'EditionsMustHaveExactlyOneToken',
  () => new EditionsMustHaveExactlyOneTokenError()
);

/**
 * MaxEditionsMintedAlready: ''
 *
 * @category Errors
 * @category generated
 */
export class MaxEditionsMintedAlreadyError extends Error {
  readonly code: number = 0x11;
  readonly name: string = 'MaxEditionsMintedAlready';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MaxEditionsMintedAlreadyError);
    }
  }
}

createErrorFromCodeLookup.set(0x11, () => new MaxEditionsMintedAlreadyError());
createErrorFromNameLookup.set(
  'MaxEditionsMintedAlready',
  () => new MaxEditionsMintedAlreadyError()
);

/**
 * TokenMintToFailed: ''
 *
 * @category Errors
 * @category generated
 */
export class TokenMintToFailedError extends Error {
  readonly code: number = 0x12;
  readonly name: string = 'TokenMintToFailed';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, TokenMintToFailedError);
    }
  }
}

createErrorFromCodeLookup.set(0x12, () => new TokenMintToFailedError());
createErrorFromNameLookup.set(
  'TokenMintToFailed',
  () => new TokenMintToFailedError()
);

/**
 * MasterRecordMismatch: ''
 *
 * @category Errors
 * @category generated
 */
export class MasterRecordMismatchError extends Error {
  readonly code: number = 0x13;
  readonly name: string = 'MasterRecordMismatch';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MasterRecordMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(0x13, () => new MasterRecordMismatchError());
createErrorFromNameLookup.set(
  'MasterRecordMismatch',
  () => new MasterRecordMismatchError()
);

/**
 * DestinationMintMismatch: ''
 *
 * @category Errors
 * @category generated
 */
export class DestinationMintMismatchError extends Error {
  readonly code: number = 0x14;
  readonly name: string = 'DestinationMintMismatch';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DestinationMintMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(0x14, () => new DestinationMintMismatchError());
createErrorFromNameLookup.set(
  'DestinationMintMismatch',
  () => new DestinationMintMismatchError()
);

/**
 * EditionAlreadyMinted: ''
 *
 * @category Errors
 * @category generated
 */
export class EditionAlreadyMintedError extends Error {
  readonly code: number = 0x15;
  readonly name: string = 'EditionAlreadyMinted';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, EditionAlreadyMintedError);
    }
  }
}

createErrorFromCodeLookup.set(0x15, () => new EditionAlreadyMintedError());
createErrorFromNameLookup.set(
  'EditionAlreadyMinted',
  () => new EditionAlreadyMintedError()
);

/**
 * PrintingMintDecimalsShouldBeZero: ''
 *
 * @category Errors
 * @category generated
 */
export class PrintingMintDecimalsShouldBeZeroError extends Error {
  readonly code: number = 0x16;
  readonly name: string = 'PrintingMintDecimalsShouldBeZero';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, PrintingMintDecimalsShouldBeZeroError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x16,
  () => new PrintingMintDecimalsShouldBeZeroError()
);
createErrorFromNameLookup.set(
  'PrintingMintDecimalsShouldBeZero',
  () => new PrintingMintDecimalsShouldBeZeroError()
);

/**
 * OneTimePrintingAuthorizationMintDecimalsShouldBeZero: ''
 *
 * @category Errors
 * @category generated
 */
export class OneTimePrintingAuthorizationMintDecimalsShouldBeZeroError extends Error {
  readonly code: number = 0x17;
  readonly name: string =
    'OneTimePrintingAuthorizationMintDecimalsShouldBeZero';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        OneTimePrintingAuthorizationMintDecimalsShouldBeZeroError
      );
    }
  }
}

createErrorFromCodeLookup.set(
  0x17,
  () => new OneTimePrintingAuthorizationMintDecimalsShouldBeZeroError()
);
createErrorFromNameLookup.set(
  'OneTimePrintingAuthorizationMintDecimalsShouldBeZero',
  () => new OneTimePrintingAuthorizationMintDecimalsShouldBeZeroError()
);

/**
 * EditionMintDecimalsShouldBeZero: 'EditionMintDecimalsShouldBeZero'
 *
 * @category Errors
 * @category generated
 */
export class EditionMintDecimalsShouldBeZeroError extends Error {
  readonly code: number = 0x18;
  readonly name: string = 'EditionMintDecimalsShouldBeZero';
  constructor() {
    super('EditionMintDecimalsShouldBeZero');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, EditionMintDecimalsShouldBeZeroError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x18,
  () => new EditionMintDecimalsShouldBeZeroError()
);
createErrorFromNameLookup.set(
  'EditionMintDecimalsShouldBeZero',
  () => new EditionMintDecimalsShouldBeZeroError()
);

/**
 * TokenBurnFailed: ''
 *
 * @category Errors
 * @category generated
 */
export class TokenBurnFailedError extends Error {
  readonly code: number = 0x19;
  readonly name: string = 'TokenBurnFailed';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, TokenBurnFailedError);
    }
  }
}

createErrorFromCodeLookup.set(0x19, () => new TokenBurnFailedError());
createErrorFromNameLookup.set(
  'TokenBurnFailed',
  () => new TokenBurnFailedError()
);

/**
 * TokenAccountOneTimeAuthMintMismatch: ''
 *
 * @category Errors
 * @category generated
 */
export class TokenAccountOneTimeAuthMintMismatchError extends Error {
  readonly code: number = 0x1a;
  readonly name: string = 'TokenAccountOneTimeAuthMintMismatch';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, TokenAccountOneTimeAuthMintMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x1a,
  () => new TokenAccountOneTimeAuthMintMismatchError()
);
createErrorFromNameLookup.set(
  'TokenAccountOneTimeAuthMintMismatch',
  () => new TokenAccountOneTimeAuthMintMismatchError()
);

/**
 * DerivedKeyInvalid: 'Derived key invalid'
 *
 * @category Errors
 * @category generated
 */
export class DerivedKeyInvalidError extends Error {
  readonly code: number = 0x1b;
  readonly name: string = 'DerivedKeyInvalid';
  constructor() {
    super('Derived key invalid');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DerivedKeyInvalidError);
    }
  }
}

createErrorFromCodeLookup.set(0x1b, () => new DerivedKeyInvalidError());
createErrorFromNameLookup.set(
  'DerivedKeyInvalid',
  () => new DerivedKeyInvalidError()
);

/**
 * PrintingMintMismatch: 'The Printing mint does not match that on the master edition!'
 *
 * @category Errors
 * @category generated
 */
export class PrintingMintMismatchError extends Error {
  readonly code: number = 0x1c;
  readonly name: string = 'PrintingMintMismatch';
  constructor() {
    super('The Printing mint does not match that on the master edition!');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, PrintingMintMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(0x1c, () => new PrintingMintMismatchError());
createErrorFromNameLookup.set(
  'PrintingMintMismatch',
  () => new PrintingMintMismatchError()
);

/**
 * OneTimePrintingAuthMintMismatch: 'The One Time Printing Auth mint does not match that on the master edition!'
 *
 * @category Errors
 * @category generated
 */
export class OneTimePrintingAuthMintMismatchError extends Error {
  readonly code: number = 0x1d;
  readonly name: string = 'OneTimePrintingAuthMintMismatch';
  constructor() {
    super(
      'The One Time Printing Auth mint does not match that on the master edition!'
    );
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, OneTimePrintingAuthMintMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x1d,
  () => new OneTimePrintingAuthMintMismatchError()
);
createErrorFromNameLookup.set(
  'OneTimePrintingAuthMintMismatch',
  () => new OneTimePrintingAuthMintMismatchError()
);

/**
 * TokenAccountMintMismatch: 'The mint of the token account does not match the Printing mint!'
 *
 * @category Errors
 * @category generated
 */
export class TokenAccountMintMismatchError extends Error {
  readonly code: number = 0x1e;
  readonly name: string = 'TokenAccountMintMismatch';
  constructor() {
    super('The mint of the token account does not match the Printing mint!');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, TokenAccountMintMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(0x1e, () => new TokenAccountMintMismatchError());
createErrorFromNameLookup.set(
  'TokenAccountMintMismatch',
  () => new TokenAccountMintMismatchError()
);

/**
 * TokenAccountMintMismatchV2: 'The mint of the token account does not match the master metadata mint!'
 *
 * @category Errors
 * @category generated
 */
export class TokenAccountMintMismatchV2Error extends Error {
  readonly code: number = 0x1f;
  readonly name: string = 'TokenAccountMintMismatchV2';
  constructor() {
    super(
      'The mint of the token account does not match the master metadata mint!'
    );
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, TokenAccountMintMismatchV2Error);
    }
  }
}

createErrorFromCodeLookup.set(
  0x1f,
  () => new TokenAccountMintMismatchV2Error()
);
createErrorFromNameLookup.set(
  'TokenAccountMintMismatchV2',
  () => new TokenAccountMintMismatchV2Error()
);

/**
 * NotEnoughTokens: 'Not enough tokens to mint a limited edition'
 *
 * @category Errors
 * @category generated
 */
export class NotEnoughTokensError extends Error {
  readonly code: number = 0x20;
  readonly name: string = 'NotEnoughTokens';
  constructor() {
    super('Not enough tokens to mint a limited edition');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NotEnoughTokensError);
    }
  }
}

createErrorFromCodeLookup.set(0x20, () => new NotEnoughTokensError());
createErrorFromNameLookup.set(
  'NotEnoughTokens',
  () => new NotEnoughTokensError()
);

/**
 * PrintingMintAuthorizationAccountMismatch: ''
 *
 * @category Errors
 * @category generated
 */
export class PrintingMintAuthorizationAccountMismatchError extends Error {
  readonly code: number = 0x21;
  readonly name: string = 'PrintingMintAuthorizationAccountMismatch';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        PrintingMintAuthorizationAccountMismatchError
      );
    }
  }
}

createErrorFromCodeLookup.set(
  0x21,
  () => new PrintingMintAuthorizationAccountMismatchError()
);
createErrorFromNameLookup.set(
  'PrintingMintAuthorizationAccountMismatch',
  () => new PrintingMintAuthorizationAccountMismatchError()
);

/**
 * AuthorizationTokenAccountOwnerMismatch: ''
 *
 * @category Errors
 * @category generated
 */
export class AuthorizationTokenAccountOwnerMismatchError extends Error {
  readonly code: number = 0x22;
  readonly name: string = 'AuthorizationTokenAccountOwnerMismatch';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        AuthorizationTokenAccountOwnerMismatchError
      );
    }
  }
}

createErrorFromCodeLookup.set(
  0x22,
  () => new AuthorizationTokenAccountOwnerMismatchError()
);
createErrorFromNameLookup.set(
  'AuthorizationTokenAccountOwnerMismatch',
  () => new AuthorizationTokenAccountOwnerMismatchError()
);

/**
 * Disabled: ''
 *
 * @category Errors
 * @category generated
 */
export class DisabledError extends Error {
  readonly code: number = 0x23;
  readonly name: string = 'Disabled';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DisabledError);
    }
  }
}

createErrorFromCodeLookup.set(0x23, () => new DisabledError());
createErrorFromNameLookup.set('Disabled', () => new DisabledError());

/**
 * CreatorsTooLong: 'Creators list too long'
 *
 * @category Errors
 * @category generated
 */
export class CreatorsTooLongError extends Error {
  readonly code: number = 0x24;
  readonly name: string = 'CreatorsTooLong';
  constructor() {
    super('Creators list too long');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CreatorsTooLongError);
    }
  }
}

createErrorFromCodeLookup.set(0x24, () => new CreatorsTooLongError());
createErrorFromNameLookup.set(
  'CreatorsTooLong',
  () => new CreatorsTooLongError()
);

/**
 * CreatorsMustBeAtleastOne: 'Creators must be at least one if set'
 *
 * @category Errors
 * @category generated
 */
export class CreatorsMustBeAtleastOneError extends Error {
  readonly code: number = 0x25;
  readonly name: string = 'CreatorsMustBeAtleastOne';
  constructor() {
    super('Creators must be at least one if set');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CreatorsMustBeAtleastOneError);
    }
  }
}

createErrorFromCodeLookup.set(0x25, () => new CreatorsMustBeAtleastOneError());
createErrorFromNameLookup.set(
  'CreatorsMustBeAtleastOne',
  () => new CreatorsMustBeAtleastOneError()
);

/**
 * MustBeOneOfCreators: ''
 *
 * @category Errors
 * @category generated
 */
export class MustBeOneOfCreatorsError extends Error {
  readonly code: number = 0x26;
  readonly name: string = 'MustBeOneOfCreators';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MustBeOneOfCreatorsError);
    }
  }
}

createErrorFromCodeLookup.set(0x26, () => new MustBeOneOfCreatorsError());
createErrorFromNameLookup.set(
  'MustBeOneOfCreators',
  () => new MustBeOneOfCreatorsError()
);

/**
 * NoCreatorsPresentOnMetadata: 'This metadata does not have creators'
 *
 * @category Errors
 * @category generated
 */
export class NoCreatorsPresentOnMetadataError extends Error {
  readonly code: number = 0x27;
  readonly name: string = 'NoCreatorsPresentOnMetadata';
  constructor() {
    super('This metadata does not have creators');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NoCreatorsPresentOnMetadataError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x27,
  () => new NoCreatorsPresentOnMetadataError()
);
createErrorFromNameLookup.set(
  'NoCreatorsPresentOnMetadata',
  () => new NoCreatorsPresentOnMetadataError()
);

/**
 * CreatorNotFound: 'This creator address was not found'
 *
 * @category Errors
 * @category generated
 */
export class CreatorNotFoundError extends Error {
  readonly code: number = 0x28;
  readonly name: string = 'CreatorNotFound';
  constructor() {
    super('This creator address was not found');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CreatorNotFoundError);
    }
  }
}

createErrorFromCodeLookup.set(0x28, () => new CreatorNotFoundError());
createErrorFromNameLookup.set(
  'CreatorNotFound',
  () => new CreatorNotFoundError()
);

/**
 * InvalidBasisPoints: 'Basis points cannot be more than 10000'
 *
 * @category Errors
 * @category generated
 */
export class InvalidBasisPointsError extends Error {
  readonly code: number = 0x29;
  readonly name: string = 'InvalidBasisPoints';
  constructor() {
    super('Basis points cannot be more than 10000');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidBasisPointsError);
    }
  }
}

createErrorFromCodeLookup.set(0x29, () => new InvalidBasisPointsError());
createErrorFromNameLookup.set(
  'InvalidBasisPoints',
  () => new InvalidBasisPointsError()
);

/**
 * PrimarySaleCanOnlyBeFlippedToTrue: 'Primary sale can only be flipped to true and is immutable'
 *
 * @category Errors
 * @category generated
 */
export class PrimarySaleCanOnlyBeFlippedToTrueError extends Error {
  readonly code: number = 0x2a;
  readonly name: string = 'PrimarySaleCanOnlyBeFlippedToTrue';
  constructor() {
    super('Primary sale can only be flipped to true and is immutable');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, PrimarySaleCanOnlyBeFlippedToTrueError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x2a,
  () => new PrimarySaleCanOnlyBeFlippedToTrueError()
);
createErrorFromNameLookup.set(
  'PrimarySaleCanOnlyBeFlippedToTrue',
  () => new PrimarySaleCanOnlyBeFlippedToTrueError()
);

/**
 * OwnerMismatch: 'Owner does not match that on the account given'
 *
 * @category Errors
 * @category generated
 */
export class OwnerMismatchError extends Error {
  readonly code: number = 0x2b;
  readonly name: string = 'OwnerMismatch';
  constructor() {
    super('Owner does not match that on the account given');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, OwnerMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(0x2b, () => new OwnerMismatchError());
createErrorFromNameLookup.set('OwnerMismatch', () => new OwnerMismatchError());

/**
 * NoBalanceInAccountForAuthorization: 'This account has no tokens to be used for authorization'
 *
 * @category Errors
 * @category generated
 */
export class NoBalanceInAccountForAuthorizationError extends Error {
  readonly code: number = 0x2c;
  readonly name: string = 'NoBalanceInAccountForAuthorization';
  constructor() {
    super('This account has no tokens to be used for authorization');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NoBalanceInAccountForAuthorizationError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x2c,
  () => new NoBalanceInAccountForAuthorizationError()
);
createErrorFromNameLookup.set(
  'NoBalanceInAccountForAuthorization',
  () => new NoBalanceInAccountForAuthorizationError()
);

/**
 * ShareTotalMustBe100: 'Share total must equal 100 for creator array'
 *
 * @category Errors
 * @category generated
 */
export class ShareTotalMustBe100Error extends Error {
  readonly code: number = 0x2d;
  readonly name: string = 'ShareTotalMustBe100';
  constructor() {
    super('Share total must equal 100 for creator array');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ShareTotalMustBe100Error);
    }
  }
}

createErrorFromCodeLookup.set(0x2d, () => new ShareTotalMustBe100Error());
createErrorFromNameLookup.set(
  'ShareTotalMustBe100',
  () => new ShareTotalMustBe100Error()
);

/**
 * ReservationExists: ''
 *
 * @category Errors
 * @category generated
 */
export class ReservationExistsError extends Error {
  readonly code: number = 0x2e;
  readonly name: string = 'ReservationExists';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ReservationExistsError);
    }
  }
}

createErrorFromCodeLookup.set(0x2e, () => new ReservationExistsError());
createErrorFromNameLookup.set(
  'ReservationExists',
  () => new ReservationExistsError()
);

/**
 * ReservationDoesNotExist: ''
 *
 * @category Errors
 * @category generated
 */
export class ReservationDoesNotExistError extends Error {
  readonly code: number = 0x2f;
  readonly name: string = 'ReservationDoesNotExist';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ReservationDoesNotExistError);
    }
  }
}

createErrorFromCodeLookup.set(0x2f, () => new ReservationDoesNotExistError());
createErrorFromNameLookup.set(
  'ReservationDoesNotExist',
  () => new ReservationDoesNotExistError()
);

/**
 * ReservationNotSet: ''
 *
 * @category Errors
 * @category generated
 */
export class ReservationNotSetError extends Error {
  readonly code: number = 0x30;
  readonly name: string = 'ReservationNotSet';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ReservationNotSetError);
    }
  }
}

createErrorFromCodeLookup.set(0x30, () => new ReservationNotSetError());
createErrorFromNameLookup.set(
  'ReservationNotSet',
  () => new ReservationNotSetError()
);

/**
 * ReservationAlreadyMade: ''
 *
 * @category Errors
 * @category generated
 */
export class ReservationAlreadyMadeError extends Error {
  readonly code: number = 0x31;
  readonly name: string = 'ReservationAlreadyMade';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ReservationAlreadyMadeError);
    }
  }
}

createErrorFromCodeLookup.set(0x31, () => new ReservationAlreadyMadeError());
createErrorFromNameLookup.set(
  'ReservationAlreadyMade',
  () => new ReservationAlreadyMadeError()
);

/**
 * BeyondMaxAddressSize: ''
 *
 * @category Errors
 * @category generated
 */
export class BeyondMaxAddressSizeError extends Error {
  readonly code: number = 0x32;
  readonly name: string = 'BeyondMaxAddressSize';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, BeyondMaxAddressSizeError);
    }
  }
}

createErrorFromCodeLookup.set(0x32, () => new BeyondMaxAddressSizeError());
createErrorFromNameLookup.set(
  'BeyondMaxAddressSize',
  () => new BeyondMaxAddressSizeError()
);

/**
 * NumericalOverflowError: 'NumericalOverflowError'
 *
 * @category Errors
 * @category generated
 */
export class NumericalOverflowErrorError extends Error {
  readonly code: number = 0x33;
  readonly name: string = 'NumericalOverflowError';
  constructor() {
    super('NumericalOverflowError');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NumericalOverflowErrorError);
    }
  }
}

createErrorFromCodeLookup.set(0x33, () => new NumericalOverflowErrorError());
createErrorFromNameLookup.set(
  'NumericalOverflowError',
  () => new NumericalOverflowErrorError()
);

/**
 * ReservationBreachesMaximumSupply: ''
 *
 * @category Errors
 * @category generated
 */
export class ReservationBreachesMaximumSupplyError extends Error {
  readonly code: number = 0x34;
  readonly name: string = 'ReservationBreachesMaximumSupply';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ReservationBreachesMaximumSupplyError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x34,
  () => new ReservationBreachesMaximumSupplyError()
);
createErrorFromNameLookup.set(
  'ReservationBreachesMaximumSupply',
  () => new ReservationBreachesMaximumSupplyError()
);

/**
 * AddressNotInReservation: ''
 *
 * @category Errors
 * @category generated
 */
export class AddressNotInReservationError extends Error {
  readonly code: number = 0x35;
  readonly name: string = 'AddressNotInReservation';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, AddressNotInReservationError);
    }
  }
}

createErrorFromCodeLookup.set(0x35, () => new AddressNotInReservationError());
createErrorFromNameLookup.set(
  'AddressNotInReservation',
  () => new AddressNotInReservationError()
);

/**
 * CannotVerifyAnotherCreator: 'You cannot unilaterally verify another creator, they must sign'
 *
 * @category Errors
 * @category generated
 */
export class CannotVerifyAnotherCreatorError extends Error {
  readonly code: number = 0x36;
  readonly name: string = 'CannotVerifyAnotherCreator';
  constructor() {
    super('You cannot unilaterally verify another creator, they must sign');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CannotVerifyAnotherCreatorError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x36,
  () => new CannotVerifyAnotherCreatorError()
);
createErrorFromNameLookup.set(
  'CannotVerifyAnotherCreator',
  () => new CannotVerifyAnotherCreatorError()
);

/**
 * CannotUnverifyAnotherCreator: 'You cannot unilaterally unverify another creator'
 *
 * @category Errors
 * @category generated
 */
export class CannotUnverifyAnotherCreatorError extends Error {
  readonly code: number = 0x37;
  readonly name: string = 'CannotUnverifyAnotherCreator';
  constructor() {
    super('You cannot unilaterally unverify another creator');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CannotUnverifyAnotherCreatorError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x37,
  () => new CannotUnverifyAnotherCreatorError()
);
createErrorFromNameLookup.set(
  'CannotUnverifyAnotherCreator',
  () => new CannotUnverifyAnotherCreatorError()
);

/**
 * SpotMismatch: ''
 *
 * @category Errors
 * @category generated
 */
export class SpotMismatchError extends Error {
  readonly code: number = 0x38;
  readonly name: string = 'SpotMismatch';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SpotMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(0x38, () => new SpotMismatchError());
createErrorFromNameLookup.set('SpotMismatch', () => new SpotMismatchError());

/**
 * IncorrectOwner: 'Incorrect account owner'
 *
 * @category Errors
 * @category generated
 */
export class IncorrectOwnerError extends Error {
  readonly code: number = 0x39;
  readonly name: string = 'IncorrectOwner';
  constructor() {
    super('Incorrect account owner');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, IncorrectOwnerError);
    }
  }
}

createErrorFromCodeLookup.set(0x39, () => new IncorrectOwnerError());
createErrorFromNameLookup.set(
  'IncorrectOwner',
  () => new IncorrectOwnerError()
);

/**
 * PrintingWouldBreachMaximumSupply: ''
 *
 * @category Errors
 * @category generated
 */
export class PrintingWouldBreachMaximumSupplyError extends Error {
  readonly code: number = 0x3a;
  readonly name: string = 'PrintingWouldBreachMaximumSupply';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, PrintingWouldBreachMaximumSupplyError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x3a,
  () => new PrintingWouldBreachMaximumSupplyError()
);
createErrorFromNameLookup.set(
  'PrintingWouldBreachMaximumSupply',
  () => new PrintingWouldBreachMaximumSupplyError()
);

/**
 * DataIsImmutable: 'Data is immutable'
 *
 * @category Errors
 * @category generated
 */
export class DataIsImmutableError extends Error {
  readonly code: number = 0x3b;
  readonly name: string = 'DataIsImmutable';
  constructor() {
    super('Data is immutable');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DataIsImmutableError);
    }
  }
}

createErrorFromCodeLookup.set(0x3b, () => new DataIsImmutableError());
createErrorFromNameLookup.set(
  'DataIsImmutable',
  () => new DataIsImmutableError()
);

/**
 * DuplicateCreatorAddress: 'No duplicate creator addresses'
 *
 * @category Errors
 * @category generated
 */
export class DuplicateCreatorAddressError extends Error {
  readonly code: number = 0x3c;
  readonly name: string = 'DuplicateCreatorAddress';
  constructor() {
    super('No duplicate creator addresses');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DuplicateCreatorAddressError);
    }
  }
}

createErrorFromCodeLookup.set(0x3c, () => new DuplicateCreatorAddressError());
createErrorFromNameLookup.set(
  'DuplicateCreatorAddress',
  () => new DuplicateCreatorAddressError()
);

/**
 * ReservationSpotsRemainingShouldMatchTotalSpotsAtStart: ''
 *
 * @category Errors
 * @category generated
 */
export class ReservationSpotsRemainingShouldMatchTotalSpotsAtStartError extends Error {
  readonly code: number = 0x3d;
  readonly name: string =
    'ReservationSpotsRemainingShouldMatchTotalSpotsAtStart';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        ReservationSpotsRemainingShouldMatchTotalSpotsAtStartError
      );
    }
  }
}

createErrorFromCodeLookup.set(
  0x3d,
  () => new ReservationSpotsRemainingShouldMatchTotalSpotsAtStartError()
);
createErrorFromNameLookup.set(
  'ReservationSpotsRemainingShouldMatchTotalSpotsAtStart',
  () => new ReservationSpotsRemainingShouldMatchTotalSpotsAtStartError()
);

/**
 * InvalidTokenProgram: 'Invalid token program'
 *
 * @category Errors
 * @category generated
 */
export class InvalidTokenProgramError extends Error {
  readonly code: number = 0x3e;
  readonly name: string = 'InvalidTokenProgram';
  constructor() {
    super('Invalid token program');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidTokenProgramError);
    }
  }
}

createErrorFromCodeLookup.set(0x3e, () => new InvalidTokenProgramError());
createErrorFromNameLookup.set(
  'InvalidTokenProgram',
  () => new InvalidTokenProgramError()
);

/**
 * DataTypeMismatch: 'Data type mismatch'
 *
 * @category Errors
 * @category generated
 */
export class DataTypeMismatchError extends Error {
  readonly code: number = 0x3f;
  readonly name: string = 'DataTypeMismatch';
  constructor() {
    super('Data type mismatch');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DataTypeMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(0x3f, () => new DataTypeMismatchError());
createErrorFromNameLookup.set(
  'DataTypeMismatch',
  () => new DataTypeMismatchError()
);

/**
 * BeyondAlottedAddressSize: ''
 *
 * @category Errors
 * @category generated
 */
export class BeyondAlottedAddressSizeError extends Error {
  readonly code: number = 0x40;
  readonly name: string = 'BeyondAlottedAddressSize';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, BeyondAlottedAddressSizeError);
    }
  }
}

createErrorFromCodeLookup.set(0x40, () => new BeyondAlottedAddressSizeError());
createErrorFromNameLookup.set(
  'BeyondAlottedAddressSize',
  () => new BeyondAlottedAddressSizeError()
);

/**
 * ReservationNotComplete: ''
 *
 * @category Errors
 * @category generated
 */
export class ReservationNotCompleteError extends Error {
  readonly code: number = 0x41;
  readonly name: string = 'ReservationNotComplete';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ReservationNotCompleteError);
    }
  }
}

createErrorFromCodeLookup.set(0x41, () => new ReservationNotCompleteError());
createErrorFromNameLookup.set(
  'ReservationNotComplete',
  () => new ReservationNotCompleteError()
);

/**
 * TriedToReplaceAnExistingReservation: ''
 *
 * @category Errors
 * @category generated
 */
export class TriedToReplaceAnExistingReservationError extends Error {
  readonly code: number = 0x42;
  readonly name: string = 'TriedToReplaceAnExistingReservation';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, TriedToReplaceAnExistingReservationError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x42,
  () => new TriedToReplaceAnExistingReservationError()
);
createErrorFromNameLookup.set(
  'TriedToReplaceAnExistingReservation',
  () => new TriedToReplaceAnExistingReservationError()
);

/**
 * InvalidOperation: 'Invalid operation'
 *
 * @category Errors
 * @category generated
 */
export class InvalidOperationError extends Error {
  readonly code: number = 0x43;
  readonly name: string = 'InvalidOperation';
  constructor() {
    super('Invalid operation');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidOperationError);
    }
  }
}

createErrorFromCodeLookup.set(0x43, () => new InvalidOperationError());
createErrorFromNameLookup.set(
  'InvalidOperation',
  () => new InvalidOperationError()
);

/**
 * InvalidOwner: 'Invalid Owner'
 *
 * @category Errors
 * @category generated
 */
export class InvalidOwnerError extends Error {
  readonly code: number = 0x44;
  readonly name: string = 'InvalidOwner';
  constructor() {
    super('Invalid Owner');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidOwnerError);
    }
  }
}

createErrorFromCodeLookup.set(0x44, () => new InvalidOwnerError());
createErrorFromNameLookup.set('InvalidOwner', () => new InvalidOwnerError());

/**
 * PrintingMintSupplyMustBeZeroForConversion: 'Printing mint supply must be zero for conversion'
 *
 * @category Errors
 * @category generated
 */
export class PrintingMintSupplyMustBeZeroForConversionError extends Error {
  readonly code: number = 0x45;
  readonly name: string = 'PrintingMintSupplyMustBeZeroForConversion';
  constructor() {
    super('Printing mint supply must be zero for conversion');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        PrintingMintSupplyMustBeZeroForConversionError
      );
    }
  }
}

createErrorFromCodeLookup.set(
  0x45,
  () => new PrintingMintSupplyMustBeZeroForConversionError()
);
createErrorFromNameLookup.set(
  'PrintingMintSupplyMustBeZeroForConversion',
  () => new PrintingMintSupplyMustBeZeroForConversionError()
);

/**
 * OneTimeAuthMintSupplyMustBeZeroForConversion: 'One Time Auth mint supply must be zero for conversion'
 *
 * @category Errors
 * @category generated
 */
export class OneTimeAuthMintSupplyMustBeZeroForConversionError extends Error {
  readonly code: number = 0x46;
  readonly name: string = 'OneTimeAuthMintSupplyMustBeZeroForConversion';
  constructor() {
    super('One Time Auth mint supply must be zero for conversion');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        OneTimeAuthMintSupplyMustBeZeroForConversionError
      );
    }
  }
}

createErrorFromCodeLookup.set(
  0x46,
  () => new OneTimeAuthMintSupplyMustBeZeroForConversionError()
);
createErrorFromNameLookup.set(
  'OneTimeAuthMintSupplyMustBeZeroForConversion',
  () => new OneTimeAuthMintSupplyMustBeZeroForConversionError()
);

/**
 * InvalidEditionIndex: 'You tried to insert one edition too many into an edition mark pda'
 *
 * @category Errors
 * @category generated
 */
export class InvalidEditionIndexError extends Error {
  readonly code: number = 0x47;
  readonly name: string = 'InvalidEditionIndex';
  constructor() {
    super('You tried to insert one edition too many into an edition mark pda');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidEditionIndexError);
    }
  }
}

createErrorFromCodeLookup.set(0x47, () => new InvalidEditionIndexError());
createErrorFromNameLookup.set(
  'InvalidEditionIndex',
  () => new InvalidEditionIndexError()
);

/**
 * ReservationArrayShouldBeSizeOne: ''
 *
 * @category Errors
 * @category generated
 */
export class ReservationArrayShouldBeSizeOneError extends Error {
  readonly code: number = 0x48;
  readonly name: string = 'ReservationArrayShouldBeSizeOne';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ReservationArrayShouldBeSizeOneError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x48,
  () => new ReservationArrayShouldBeSizeOneError()
);
createErrorFromNameLookup.set(
  'ReservationArrayShouldBeSizeOne',
  () => new ReservationArrayShouldBeSizeOneError()
);

/**
 * IsMutableCanOnlyBeFlippedToFalse: 'Is Mutable can only be flipped to false'
 *
 * @category Errors
 * @category generated
 */
export class IsMutableCanOnlyBeFlippedToFalseError extends Error {
  readonly code: number = 0x49;
  readonly name: string = 'IsMutableCanOnlyBeFlippedToFalse';
  constructor() {
    super('Is Mutable can only be flipped to false');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, IsMutableCanOnlyBeFlippedToFalseError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x49,
  () => new IsMutableCanOnlyBeFlippedToFalseError()
);
createErrorFromNameLookup.set(
  'IsMutableCanOnlyBeFlippedToFalse',
  () => new IsMutableCanOnlyBeFlippedToFalseError()
);

/**
 * CollectionCannotBeVerifiedInThisInstruction: 'Collection cannot be verified in this instruction'
 *
 * @category Errors
 * @category generated
 */
export class CollectionCannotBeVerifiedInThisInstructionError extends Error {
  readonly code: number = 0x4a;
  readonly name: string = 'CollectionCannotBeVerifiedInThisInstruction';
  constructor() {
    super('Collection cannot be verified in this instruction');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        CollectionCannotBeVerifiedInThisInstructionError
      );
    }
  }
}

createErrorFromCodeLookup.set(
  0x4a,
  () => new CollectionCannotBeVerifiedInThisInstructionError()
);
createErrorFromNameLookup.set(
  'CollectionCannotBeVerifiedInThisInstruction',
  () => new CollectionCannotBeVerifiedInThisInstructionError()
);

/**
 * Removed: 'This instruction was deprecated in a previous release and is now removed'
 *
 * @category Errors
 * @category generated
 */
export class RemovedError extends Error {
  readonly code: number = 0x4b;
  readonly name: string = 'Removed';
  constructor() {
    super(
      'This instruction was deprecated in a previous release and is now removed'
    );
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, RemovedError);
    }
  }
}

createErrorFromCodeLookup.set(0x4b, () => new RemovedError());
createErrorFromNameLookup.set('Removed', () => new RemovedError());

/**
 * MustBeBurned: ''
 *
 * @category Errors
 * @category generated
 */
export class MustBeBurnedError extends Error {
  readonly code: number = 0x4c;
  readonly name: string = 'MustBeBurned';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MustBeBurnedError);
    }
  }
}

createErrorFromCodeLookup.set(0x4c, () => new MustBeBurnedError());
createErrorFromNameLookup.set('MustBeBurned', () => new MustBeBurnedError());

/**
 * InvalidUseMethod: 'This use method is invalid'
 *
 * @category Errors
 * @category generated
 */
export class InvalidUseMethodError extends Error {
  readonly code: number = 0x4d;
  readonly name: string = 'InvalidUseMethod';
  constructor() {
    super('This use method is invalid');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidUseMethodError);
    }
  }
}

createErrorFromCodeLookup.set(0x4d, () => new InvalidUseMethodError());
createErrorFromNameLookup.set(
  'InvalidUseMethod',
  () => new InvalidUseMethodError()
);

/**
 * CannotChangeUseMethodAfterFirstUse: 'Cannot Change Use Method after the first use'
 *
 * @category Errors
 * @category generated
 */
export class CannotChangeUseMethodAfterFirstUseError extends Error {
  readonly code: number = 0x4e;
  readonly name: string = 'CannotChangeUseMethodAfterFirstUse';
  constructor() {
    super('Cannot Change Use Method after the first use');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CannotChangeUseMethodAfterFirstUseError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x4e,
  () => new CannotChangeUseMethodAfterFirstUseError()
);
createErrorFromNameLookup.set(
  'CannotChangeUseMethodAfterFirstUse',
  () => new CannotChangeUseMethodAfterFirstUseError()
);

/**
 * CannotChangeUsesAfterFirstUse: 'Cannot Change Remaining or Available uses after the first use'
 *
 * @category Errors
 * @category generated
 */
export class CannotChangeUsesAfterFirstUseError extends Error {
  readonly code: number = 0x4f;
  readonly name: string = 'CannotChangeUsesAfterFirstUse';
  constructor() {
    super('Cannot Change Remaining or Available uses after the first use');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CannotChangeUsesAfterFirstUseError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x4f,
  () => new CannotChangeUsesAfterFirstUseError()
);
createErrorFromNameLookup.set(
  'CannotChangeUsesAfterFirstUse',
  () => new CannotChangeUsesAfterFirstUseError()
);

/**
 * CollectionNotFound: 'Collection Not Found on Metadata'
 *
 * @category Errors
 * @category generated
 */
export class CollectionNotFoundError extends Error {
  readonly code: number = 0x50;
  readonly name: string = 'CollectionNotFound';
  constructor() {
    super('Collection Not Found on Metadata');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CollectionNotFoundError);
    }
  }
}

createErrorFromCodeLookup.set(0x50, () => new CollectionNotFoundError());
createErrorFromNameLookup.set(
  'CollectionNotFound',
  () => new CollectionNotFoundError()
);

/**
 * InvalidCollectionUpdateAuthority: 'Collection Update Authority is invalid'
 *
 * @category Errors
 * @category generated
 */
export class InvalidCollectionUpdateAuthorityError extends Error {
  readonly code: number = 0x51;
  readonly name: string = 'InvalidCollectionUpdateAuthority';
  constructor() {
    super('Collection Update Authority is invalid');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidCollectionUpdateAuthorityError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x51,
  () => new InvalidCollectionUpdateAuthorityError()
);
createErrorFromNameLookup.set(
  'InvalidCollectionUpdateAuthority',
  () => new InvalidCollectionUpdateAuthorityError()
);

/**
 * CollectionMustBeAUniqueMasterEdition: 'Collection Must Be a Unique Master Edition v2'
 *
 * @category Errors
 * @category generated
 */
export class CollectionMustBeAUniqueMasterEditionError extends Error {
  readonly code: number = 0x52;
  readonly name: string = 'CollectionMustBeAUniqueMasterEdition';
  constructor() {
    super('Collection Must Be a Unique Master Edition v2');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CollectionMustBeAUniqueMasterEditionError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x52,
  () => new CollectionMustBeAUniqueMasterEditionError()
);
createErrorFromNameLookup.set(
  'CollectionMustBeAUniqueMasterEdition',
  () => new CollectionMustBeAUniqueMasterEditionError()
);

/**
 * UseAuthorityRecordAlreadyExists: 'The Use Authority Record Already Exists, to modify it Revoke, then Approve'
 *
 * @category Errors
 * @category generated
 */
export class UseAuthorityRecordAlreadyExistsError extends Error {
  readonly code: number = 0x53;
  readonly name: string = 'UseAuthorityRecordAlreadyExists';
  constructor() {
    super(
      'The Use Authority Record Already Exists, to modify it Revoke, then Approve'
    );
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, UseAuthorityRecordAlreadyExistsError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x53,
  () => new UseAuthorityRecordAlreadyExistsError()
);
createErrorFromNameLookup.set(
  'UseAuthorityRecordAlreadyExists',
  () => new UseAuthorityRecordAlreadyExistsError()
);

/**
 * UseAuthorityRecordAlreadyRevoked: 'The Use Authority Record is empty or already revoked'
 *
 * @category Errors
 * @category generated
 */
export class UseAuthorityRecordAlreadyRevokedError extends Error {
  readonly code: number = 0x54;
  readonly name: string = 'UseAuthorityRecordAlreadyRevoked';
  constructor() {
    super('The Use Authority Record is empty or already revoked');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, UseAuthorityRecordAlreadyRevokedError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x54,
  () => new UseAuthorityRecordAlreadyRevokedError()
);
createErrorFromNameLookup.set(
  'UseAuthorityRecordAlreadyRevoked',
  () => new UseAuthorityRecordAlreadyRevokedError()
);

/**
 * Unusable: 'This token has no uses'
 *
 * @category Errors
 * @category generated
 */
export class UnusableError extends Error {
  readonly code: number = 0x55;
  readonly name: string = 'Unusable';
  constructor() {
    super('This token has no uses');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, UnusableError);
    }
  }
}

createErrorFromCodeLookup.set(0x55, () => new UnusableError());
createErrorFromNameLookup.set('Unusable', () => new UnusableError());

/**
 * NotEnoughUses: 'There are not enough Uses left on this token.'
 *
 * @category Errors
 * @category generated
 */
export class NotEnoughUsesError extends Error {
  readonly code: number = 0x56;
  readonly name: string = 'NotEnoughUses';
  constructor() {
    super('There are not enough Uses left on this token.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NotEnoughUsesError);
    }
  }
}

createErrorFromCodeLookup.set(0x56, () => new NotEnoughUsesError());
createErrorFromNameLookup.set('NotEnoughUses', () => new NotEnoughUsesError());

/**
 * CollectionAuthorityRecordAlreadyExists: 'This Collection Authority Record Already Exists.'
 *
 * @category Errors
 * @category generated
 */
export class CollectionAuthorityRecordAlreadyExistsError extends Error {
  readonly code: number = 0x57;
  readonly name: string = 'CollectionAuthorityRecordAlreadyExists';
  constructor() {
    super('This Collection Authority Record Already Exists.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        CollectionAuthorityRecordAlreadyExistsError
      );
    }
  }
}

createErrorFromCodeLookup.set(
  0x57,
  () => new CollectionAuthorityRecordAlreadyExistsError()
);
createErrorFromNameLookup.set(
  'CollectionAuthorityRecordAlreadyExists',
  () => new CollectionAuthorityRecordAlreadyExistsError()
);

/**
 * CollectionAuthorityDoesNotExist: 'This Collection Authority Record Does Not Exist.'
 *
 * @category Errors
 * @category generated
 */
export class CollectionAuthorityDoesNotExistError extends Error {
  readonly code: number = 0x58;
  readonly name: string = 'CollectionAuthorityDoesNotExist';
  constructor() {
    super('This Collection Authority Record Does Not Exist.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CollectionAuthorityDoesNotExistError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x58,
  () => new CollectionAuthorityDoesNotExistError()
);
createErrorFromNameLookup.set(
  'CollectionAuthorityDoesNotExist',
  () => new CollectionAuthorityDoesNotExistError()
);

/**
 * InvalidUseAuthorityRecord: 'This Use Authority Record is invalid.'
 *
 * @category Errors
 * @category generated
 */
export class InvalidUseAuthorityRecordError extends Error {
  readonly code: number = 0x59;
  readonly name: string = 'InvalidUseAuthorityRecord';
  constructor() {
    super('This Use Authority Record is invalid.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidUseAuthorityRecordError);
    }
  }
}

createErrorFromCodeLookup.set(0x59, () => new InvalidUseAuthorityRecordError());
createErrorFromNameLookup.set(
  'InvalidUseAuthorityRecord',
  () => new InvalidUseAuthorityRecordError()
);

/**
 * InvalidCollectionAuthorityRecord: ''
 *
 * @category Errors
 * @category generated
 */
export class InvalidCollectionAuthorityRecordError extends Error {
  readonly code: number = 0x5a;
  readonly name: string = 'InvalidCollectionAuthorityRecord';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidCollectionAuthorityRecordError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x5a,
  () => new InvalidCollectionAuthorityRecordError()
);
createErrorFromNameLookup.set(
  'InvalidCollectionAuthorityRecord',
  () => new InvalidCollectionAuthorityRecordError()
);

/**
 * InvalidFreezeAuthority: 'Metadata does not match the freeze authority on the mint'
 *
 * @category Errors
 * @category generated
 */
export class InvalidFreezeAuthorityError extends Error {
  readonly code: number = 0x5b;
  readonly name: string = 'InvalidFreezeAuthority';
  constructor() {
    super('Metadata does not match the freeze authority on the mint');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidFreezeAuthorityError);
    }
  }
}

createErrorFromCodeLookup.set(0x5b, () => new InvalidFreezeAuthorityError());
createErrorFromNameLookup.set(
  'InvalidFreezeAuthority',
  () => new InvalidFreezeAuthorityError()
);

/**
 * InvalidDelegate: 'All tokens in this account have not been delegated to this user.'
 *
 * @category Errors
 * @category generated
 */
export class InvalidDelegateError extends Error {
  readonly code: number = 0x5c;
  readonly name: string = 'InvalidDelegate';
  constructor() {
    super('All tokens in this account have not been delegated to this user.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidDelegateError);
    }
  }
}

createErrorFromCodeLookup.set(0x5c, () => new InvalidDelegateError());
createErrorFromNameLookup.set(
  'InvalidDelegate',
  () => new InvalidDelegateError()
);

/**
 * CannotAdjustVerifiedCreator: ''
 *
 * @category Errors
 * @category generated
 */
export class CannotAdjustVerifiedCreatorError extends Error {
  readonly code: number = 0x5d;
  readonly name: string = 'CannotAdjustVerifiedCreator';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CannotAdjustVerifiedCreatorError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x5d,
  () => new CannotAdjustVerifiedCreatorError()
);
createErrorFromNameLookup.set(
  'CannotAdjustVerifiedCreator',
  () => new CannotAdjustVerifiedCreatorError()
);

/**
 * CannotRemoveVerifiedCreator: 'Verified creators cannot be removed.'
 *
 * @category Errors
 * @category generated
 */
export class CannotRemoveVerifiedCreatorError extends Error {
  readonly code: number = 0x5e;
  readonly name: string = 'CannotRemoveVerifiedCreator';
  constructor() {
    super('Verified creators cannot be removed.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CannotRemoveVerifiedCreatorError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x5e,
  () => new CannotRemoveVerifiedCreatorError()
);
createErrorFromNameLookup.set(
  'CannotRemoveVerifiedCreator',
  () => new CannotRemoveVerifiedCreatorError()
);

/**
 * CannotWipeVerifiedCreators: ''
 *
 * @category Errors
 * @category generated
 */
export class CannotWipeVerifiedCreatorsError extends Error {
  readonly code: number = 0x5f;
  readonly name: string = 'CannotWipeVerifiedCreators';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CannotWipeVerifiedCreatorsError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x5f,
  () => new CannotWipeVerifiedCreatorsError()
);
createErrorFromNameLookup.set(
  'CannotWipeVerifiedCreators',
  () => new CannotWipeVerifiedCreatorsError()
);

/**
 * NotAllowedToChangeSellerFeeBasisPoints: ''
 *
 * @category Errors
 * @category generated
 */
export class NotAllowedToChangeSellerFeeBasisPointsError extends Error {
  readonly code: number = 0x60;
  readonly name: string = 'NotAllowedToChangeSellerFeeBasisPoints';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        NotAllowedToChangeSellerFeeBasisPointsError
      );
    }
  }
}

createErrorFromCodeLookup.set(
  0x60,
  () => new NotAllowedToChangeSellerFeeBasisPointsError()
);
createErrorFromNameLookup.set(
  'NotAllowedToChangeSellerFeeBasisPoints',
  () => new NotAllowedToChangeSellerFeeBasisPointsError()
);

/**
 * EditionOverrideCannotBeZero: 'Edition override cannot be zero'
 *
 * @category Errors
 * @category generated
 */
export class EditionOverrideCannotBeZeroError extends Error {
  readonly code: number = 0x61;
  readonly name: string = 'EditionOverrideCannotBeZero';
  constructor() {
    super('Edition override cannot be zero');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, EditionOverrideCannotBeZeroError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x61,
  () => new EditionOverrideCannotBeZeroError()
);
createErrorFromNameLookup.set(
  'EditionOverrideCannotBeZero',
  () => new EditionOverrideCannotBeZeroError()
);

/**
 * InvalidUser: 'Invalid User'
 *
 * @category Errors
 * @category generated
 */
export class InvalidUserError extends Error {
  readonly code: number = 0x62;
  readonly name: string = 'InvalidUser';
  constructor() {
    super('Invalid User');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidUserError);
    }
  }
}

createErrorFromCodeLookup.set(0x62, () => new InvalidUserError());
createErrorFromNameLookup.set('InvalidUser', () => new InvalidUserError());

/**
 * RevokeCollectionAuthoritySignerIncorrect: 'Revoke Collection Authority signer is incorrect'
 *
 * @category Errors
 * @category generated
 */
export class RevokeCollectionAuthoritySignerIncorrectError extends Error {
  readonly code: number = 0x63;
  readonly name: string = 'RevokeCollectionAuthoritySignerIncorrect';
  constructor() {
    super('Revoke Collection Authority signer is incorrect');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(
        this,
        RevokeCollectionAuthoritySignerIncorrectError
      );
    }
  }
}

createErrorFromCodeLookup.set(
  0x63,
  () => new RevokeCollectionAuthoritySignerIncorrectError()
);
createErrorFromNameLookup.set(
  'RevokeCollectionAuthoritySignerIncorrect',
  () => new RevokeCollectionAuthoritySignerIncorrectError()
);

/**
 * TokenCloseFailed: ''
 *
 * @category Errors
 * @category generated
 */
export class TokenCloseFailedError extends Error {
  readonly code: number = 0x64;
  readonly name: string = 'TokenCloseFailed';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, TokenCloseFailedError);
    }
  }
}

createErrorFromCodeLookup.set(0x64, () => new TokenCloseFailedError());
createErrorFromNameLookup.set(
  'TokenCloseFailed',
  () => new TokenCloseFailedError()
);

/**
 * UnsizedCollection: 'Can't use this function on unsized collection'
 *
 * @category Errors
 * @category generated
 */
export class UnsizedCollectionError extends Error {
  readonly code: number = 0x65;
  readonly name: string = 'UnsizedCollection';
  constructor() {
    super("Can't use this function on unsized collection");
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, UnsizedCollectionError);
    }
  }
}

createErrorFromCodeLookup.set(0x65, () => new UnsizedCollectionError());
createErrorFromNameLookup.set(
  'UnsizedCollection',
  () => new UnsizedCollectionError()
);

/**
 * SizedCollection: 'Can't use this function on a sized collection'
 *
 * @category Errors
 * @category generated
 */
export class SizedCollectionError extends Error {
  readonly code: number = 0x66;
  readonly name: string = 'SizedCollection';
  constructor() {
    super("Can't use this function on a sized collection");
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SizedCollectionError);
    }
  }
}

createErrorFromCodeLookup.set(0x66, () => new SizedCollectionError());
createErrorFromNameLookup.set(
  'SizedCollection',
  () => new SizedCollectionError()
);

/**
 * MissingCollectionMetadata: 'Missing collection metadata account'
 *
 * @category Errors
 * @category generated
 */
export class MissingCollectionMetadataError extends Error {
  readonly code: number = 0x67;
  readonly name: string = 'MissingCollectionMetadata';
  constructor() {
    super('Missing collection metadata account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingCollectionMetadataError);
    }
  }
}

createErrorFromCodeLookup.set(0x67, () => new MissingCollectionMetadataError());
createErrorFromNameLookup.set(
  'MissingCollectionMetadata',
  () => new MissingCollectionMetadataError()
);

/**
 * NotAMemberOfCollection: 'This NFT is not a member of the specified collection.'
 *
 * @category Errors
 * @category generated
 */
export class NotAMemberOfCollectionError extends Error {
  readonly code: number = 0x68;
  readonly name: string = 'NotAMemberOfCollection';
  constructor() {
    super('This NFT is not a member of the specified collection.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NotAMemberOfCollectionError);
    }
  }
}

createErrorFromCodeLookup.set(0x68, () => new NotAMemberOfCollectionError());
createErrorFromNameLookup.set(
  'NotAMemberOfCollection',
  () => new NotAMemberOfCollectionError()
);

/**
 * NotVerifiedMemberOfCollection: 'This NFT is not a verified member of the specified collection.'
 *
 * @category Errors
 * @category generated
 */
export class NotVerifiedMemberOfCollectionError extends Error {
  readonly code: number = 0x69;
  readonly name: string = 'NotVerifiedMemberOfCollection';
  constructor() {
    super('This NFT is not a verified member of the specified collection.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NotVerifiedMemberOfCollectionError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x69,
  () => new NotVerifiedMemberOfCollectionError()
);
createErrorFromNameLookup.set(
  'NotVerifiedMemberOfCollection',
  () => new NotVerifiedMemberOfCollectionError()
);

/**
 * NotACollectionParent: 'This NFT is not a collection parent NFT.'
 *
 * @category Errors
 * @category generated
 */
export class NotACollectionParentError extends Error {
  readonly code: number = 0x6a;
  readonly name: string = 'NotACollectionParent';
  constructor() {
    super('This NFT is not a collection parent NFT.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NotACollectionParentError);
    }
  }
}

createErrorFromCodeLookup.set(0x6a, () => new NotACollectionParentError());
createErrorFromNameLookup.set(
  'NotACollectionParent',
  () => new NotACollectionParentError()
);

/**
 * CouldNotDetermineTokenStandard: 'Could not determine a TokenStandard type.'
 *
 * @category Errors
 * @category generated
 */
export class CouldNotDetermineTokenStandardError extends Error {
  readonly code: number = 0x6b;
  readonly name: string = 'CouldNotDetermineTokenStandard';
  constructor() {
    super('Could not determine a TokenStandard type.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CouldNotDetermineTokenStandardError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x6b,
  () => new CouldNotDetermineTokenStandardError()
);
createErrorFromNameLookup.set(
  'CouldNotDetermineTokenStandard',
  () => new CouldNotDetermineTokenStandardError()
);

/**
 * MissingEditionAccount: 'This mint account has an edition but none was provided.'
 *
 * @category Errors
 * @category generated
 */
export class MissingEditionAccountError extends Error {
  readonly code: number = 0x6c;
  readonly name: string = 'MissingEditionAccount';
  constructor() {
    super('This mint account has an edition but none was provided.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingEditionAccountError);
    }
  }
}

createErrorFromCodeLookup.set(0x6c, () => new MissingEditionAccountError());
createErrorFromNameLookup.set(
  'MissingEditionAccount',
  () => new MissingEditionAccountError()
);

/**
 * NotAMasterEdition: 'This edition is not a Master Edition'
 *
 * @category Errors
 * @category generated
 */
export class NotAMasterEditionError extends Error {
  readonly code: number = 0x6d;
  readonly name: string = 'NotAMasterEdition';
  constructor() {
    super('This edition is not a Master Edition');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NotAMasterEditionError);
    }
  }
}

createErrorFromCodeLookup.set(0x6d, () => new NotAMasterEditionError());
createErrorFromNameLookup.set(
  'NotAMasterEdition',
  () => new NotAMasterEditionError()
);

/**
 * MasterEditionHasPrints: 'This Master Edition has existing prints'
 *
 * @category Errors
 * @category generated
 */
export class MasterEditionHasPrintsError extends Error {
  readonly code: number = 0x6e;
  readonly name: string = 'MasterEditionHasPrints';
  constructor() {
    super('This Master Edition has existing prints');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MasterEditionHasPrintsError);
    }
  }
}

createErrorFromCodeLookup.set(0x6e, () => new MasterEditionHasPrintsError());
createErrorFromNameLookup.set(
  'MasterEditionHasPrints',
  () => new MasterEditionHasPrintsError()
);

/**
 * BorshDeserializationError: ''
 *
 * @category Errors
 * @category generated
 */
export class BorshDeserializationErrorError extends Error {
  readonly code: number = 0x6f;
  readonly name: string = 'BorshDeserializationError';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, BorshDeserializationErrorError);
    }
  }
}

createErrorFromCodeLookup.set(0x6f, () => new BorshDeserializationErrorError());
createErrorFromNameLookup.set(
  'BorshDeserializationError',
  () => new BorshDeserializationErrorError()
);

/**
 * CannotUpdateVerifiedCollection: 'Cannot update a verified collection in this command'
 *
 * @category Errors
 * @category generated
 */
export class CannotUpdateVerifiedCollectionError extends Error {
  readonly code: number = 0x70;
  readonly name: string = 'CannotUpdateVerifiedCollection';
  constructor() {
    super('Cannot update a verified collection in this command');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CannotUpdateVerifiedCollectionError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x70,
  () => new CannotUpdateVerifiedCollectionError()
);
createErrorFromNameLookup.set(
  'CannotUpdateVerifiedCollection',
  () => new CannotUpdateVerifiedCollectionError()
);

/**
 * CollectionMasterEditionAccountInvalid: 'Edition account doesnt match collection '
 *
 * @category Errors
 * @category generated
 */
export class CollectionMasterEditionAccountInvalidError extends Error {
  readonly code: number = 0x71;
  readonly name: string = 'CollectionMasterEditionAccountInvalid';
  constructor() {
    super('Edition account doesnt match collection ');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CollectionMasterEditionAccountInvalidError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x71,
  () => new CollectionMasterEditionAccountInvalidError()
);
createErrorFromNameLookup.set(
  'CollectionMasterEditionAccountInvalid',
  () => new CollectionMasterEditionAccountInvalidError()
);

/**
 * AlreadyVerified: 'Item is already verified.'
 *
 * @category Errors
 * @category generated
 */
export class AlreadyVerifiedError extends Error {
  readonly code: number = 0x72;
  readonly name: string = 'AlreadyVerified';
  constructor() {
    super('Item is already verified.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, AlreadyVerifiedError);
    }
  }
}

createErrorFromCodeLookup.set(0x72, () => new AlreadyVerifiedError());
createErrorFromNameLookup.set(
  'AlreadyVerified',
  () => new AlreadyVerifiedError()
);

/**
 * AlreadyUnverified: ''
 *
 * @category Errors
 * @category generated
 */
export class AlreadyUnverifiedError extends Error {
  readonly code: number = 0x73;
  readonly name: string = 'AlreadyUnverified';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, AlreadyUnverifiedError);
    }
  }
}

createErrorFromCodeLookup.set(0x73, () => new AlreadyUnverifiedError());
createErrorFromNameLookup.set(
  'AlreadyUnverified',
  () => new AlreadyUnverifiedError()
);

/**
 * NotAPrintEdition: 'This edition is not a Print Edition'
 *
 * @category Errors
 * @category generated
 */
export class NotAPrintEditionError extends Error {
  readonly code: number = 0x74;
  readonly name: string = 'NotAPrintEdition';
  constructor() {
    super('This edition is not a Print Edition');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NotAPrintEditionError);
    }
  }
}

createErrorFromCodeLookup.set(0x74, () => new NotAPrintEditionError());
createErrorFromNameLookup.set(
  'NotAPrintEdition',
  () => new NotAPrintEditionError()
);

/**
 * InvalidMasterEdition: 'Invalid Master Edition'
 *
 * @category Errors
 * @category generated
 */
export class InvalidMasterEditionError extends Error {
  readonly code: number = 0x75;
  readonly name: string = 'InvalidMasterEdition';
  constructor() {
    super('Invalid Master Edition');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidMasterEditionError);
    }
  }
}

createErrorFromCodeLookup.set(0x75, () => new InvalidMasterEditionError());
createErrorFromNameLookup.set(
  'InvalidMasterEdition',
  () => new InvalidMasterEditionError()
);

/**
 * InvalidPrintEdition: 'Invalid Print Edition'
 *
 * @category Errors
 * @category generated
 */
export class InvalidPrintEditionError extends Error {
  readonly code: number = 0x76;
  readonly name: string = 'InvalidPrintEdition';
  constructor() {
    super('Invalid Print Edition');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidPrintEditionError);
    }
  }
}

createErrorFromCodeLookup.set(0x76, () => new InvalidPrintEditionError());
createErrorFromNameLookup.set(
  'InvalidPrintEdition',
  () => new InvalidPrintEditionError()
);

/**
 * InvalidEditionMarker: 'Invalid Edition Marker'
 *
 * @category Errors
 * @category generated
 */
export class InvalidEditionMarkerError extends Error {
  readonly code: number = 0x77;
  readonly name: string = 'InvalidEditionMarker';
  constructor() {
    super('Invalid Edition Marker');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidEditionMarkerError);
    }
  }
}

createErrorFromCodeLookup.set(0x77, () => new InvalidEditionMarkerError());
createErrorFromNameLookup.set(
  'InvalidEditionMarker',
  () => new InvalidEditionMarkerError()
);

/**
 * ReservationListDeprecated: 'Reservation List is Deprecated'
 *
 * @category Errors
 * @category generated
 */
export class ReservationListDeprecatedError extends Error {
  readonly code: number = 0x78;
  readonly name: string = 'ReservationListDeprecated';
  constructor() {
    super('Reservation List is Deprecated');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, ReservationListDeprecatedError);
    }
  }
}

createErrorFromCodeLookup.set(0x78, () => new ReservationListDeprecatedError());
createErrorFromNameLookup.set(
  'ReservationListDeprecated',
  () => new ReservationListDeprecatedError()
);

/**
 * PrintEditionDoesNotMatchMasterEdition: 'Print Edition does not match Master Edition'
 *
 * @category Errors
 * @category generated
 */
export class PrintEditionDoesNotMatchMasterEditionError extends Error {
  readonly code: number = 0x79;
  readonly name: string = 'PrintEditionDoesNotMatchMasterEdition';
  constructor() {
    super('Print Edition does not match Master Edition');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, PrintEditionDoesNotMatchMasterEditionError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x79,
  () => new PrintEditionDoesNotMatchMasterEditionError()
);
createErrorFromNameLookup.set(
  'PrintEditionDoesNotMatchMasterEdition',
  () => new PrintEditionDoesNotMatchMasterEditionError()
);

/**
 * EditionNumberGreaterThanMaxSupply: 'Edition Number greater than max supply'
 *
 * @category Errors
 * @category generated
 */
export class EditionNumberGreaterThanMaxSupplyError extends Error {
  readonly code: number = 0x7a;
  readonly name: string = 'EditionNumberGreaterThanMaxSupply';
  constructor() {
    super('Edition Number greater than max supply');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, EditionNumberGreaterThanMaxSupplyError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x7a,
  () => new EditionNumberGreaterThanMaxSupplyError()
);
createErrorFromNameLookup.set(
  'EditionNumberGreaterThanMaxSupply',
  () => new EditionNumberGreaterThanMaxSupplyError()
);

/**
 * MustUnverify: 'Must unverify before migrating collections.'
 *
 * @category Errors
 * @category generated
 */
export class MustUnverifyError extends Error {
  readonly code: number = 0x7b;
  readonly name: string = 'MustUnverify';
  constructor() {
    super('Must unverify before migrating collections.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MustUnverifyError);
    }
  }
}

createErrorFromCodeLookup.set(0x7b, () => new MustUnverifyError());
createErrorFromNameLookup.set('MustUnverify', () => new MustUnverifyError());

/**
 * InvalidEscrowBumpSeed: 'Invalid Escrow Account Bump Seed'
 *
 * @category Errors
 * @category generated
 */
export class InvalidEscrowBumpSeedError extends Error {
  readonly code: number = 0x7c;
  readonly name: string = 'InvalidEscrowBumpSeed';
  constructor() {
    super('Invalid Escrow Account Bump Seed');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidEscrowBumpSeedError);
    }
  }
}

createErrorFromCodeLookup.set(0x7c, () => new InvalidEscrowBumpSeedError());
createErrorFromNameLookup.set(
  'InvalidEscrowBumpSeed',
  () => new InvalidEscrowBumpSeedError()
);

/**
 * MustBeEscrowAuthority: 'Must Escrow Authority'
 *
 * @category Errors
 * @category generated
 */
export class MustBeEscrowAuthorityError extends Error {
  readonly code: number = 0x7d;
  readonly name: string = 'MustBeEscrowAuthority';
  constructor() {
    super('Must Escrow Authority');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MustBeEscrowAuthorityError);
    }
  }
}

createErrorFromCodeLookup.set(0x7d, () => new MustBeEscrowAuthorityError());
createErrorFromNameLookup.set(
  'MustBeEscrowAuthority',
  () => new MustBeEscrowAuthorityError()
);

/**
 * InvalidSystemProgram: 'Invalid System Program'
 *
 * @category Errors
 * @category generated
 */
export class InvalidSystemProgramError extends Error {
  readonly code: number = 0x7e;
  readonly name: string = 'InvalidSystemProgram';
  constructor() {
    super('Invalid System Program');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidSystemProgramError);
    }
  }
}

createErrorFromCodeLookup.set(0x7e, () => new InvalidSystemProgramError());
createErrorFromNameLookup.set(
  'InvalidSystemProgram',
  () => new InvalidSystemProgramError()
);

/**
 * MustBeNonFungible: 'Must be a Non Fungible Token'
 *
 * @category Errors
 * @category generated
 */
export class MustBeNonFungibleError extends Error {
  readonly code: number = 0x7f;
  readonly name: string = 'MustBeNonFungible';
  constructor() {
    super('Must be a Non Fungible Token');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MustBeNonFungibleError);
    }
  }
}

createErrorFromCodeLookup.set(0x7f, () => new MustBeNonFungibleError());
createErrorFromNameLookup.set(
  'MustBeNonFungible',
  () => new MustBeNonFungibleError()
);

/**
 * InsufficientTokens: 'Insufficient tokens for transfer'
 *
 * @category Errors
 * @category generated
 */
export class InsufficientTokensError extends Error {
  readonly code: number = 0x80;
  readonly name: string = 'InsufficientTokens';
  constructor() {
    super('Insufficient tokens for transfer');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InsufficientTokensError);
    }
  }
}

createErrorFromCodeLookup.set(0x80, () => new InsufficientTokensError());
createErrorFromNameLookup.set(
  'InsufficientTokens',
  () => new InsufficientTokensError()
);

/**
 * BorshSerializationError: 'Borsh Serialization Error'
 *
 * @category Errors
 * @category generated
 */
export class BorshSerializationErrorError extends Error {
  readonly code: number = 0x81;
  readonly name: string = 'BorshSerializationError';
  constructor() {
    super('Borsh Serialization Error');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, BorshSerializationErrorError);
    }
  }
}

createErrorFromCodeLookup.set(0x81, () => new BorshSerializationErrorError());
createErrorFromNameLookup.set(
  'BorshSerializationError',
  () => new BorshSerializationErrorError()
);

/**
 * NoFreezeAuthoritySet: 'Cannot create NFT with no Freeze Authority.'
 *
 * @category Errors
 * @category generated
 */
export class NoFreezeAuthoritySetError extends Error {
  readonly code: number = 0x82;
  readonly name: string = 'NoFreezeAuthoritySet';
  constructor() {
    super('Cannot create NFT with no Freeze Authority.');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, NoFreezeAuthoritySetError);
    }
  }
}

createErrorFromCodeLookup.set(0x82, () => new NoFreezeAuthoritySetError());
createErrorFromNameLookup.set(
  'NoFreezeAuthoritySet',
  () => new NoFreezeAuthoritySetError()
);

/**
 * InvalidCollectionSizeChange: 'Invalid collection size change'
 *
 * @category Errors
 * @category generated
 */
export class InvalidCollectionSizeChangeError extends Error {
  readonly code: number = 0x83;
  readonly name: string = 'InvalidCollectionSizeChange';
  constructor() {
    super('Invalid collection size change');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidCollectionSizeChangeError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x83,
  () => new InvalidCollectionSizeChangeError()
);
createErrorFromNameLookup.set(
  'InvalidCollectionSizeChange',
  () => new InvalidCollectionSizeChangeError()
);

/**
 * InvalidBubblegumSigner: 'Invalid bubblegum signer'
 *
 * @category Errors
 * @category generated
 */
export class InvalidBubblegumSignerError extends Error {
  readonly code: number = 0x84;
  readonly name: string = 'InvalidBubblegumSigner';
  constructor() {
    super('Invalid bubblegum signer');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidBubblegumSignerError);
    }
  }
}

createErrorFromCodeLookup.set(0x84, () => new InvalidBubblegumSignerError());
createErrorFromNameLookup.set(
  'InvalidBubblegumSigner',
  () => new InvalidBubblegumSignerError()
);

/**
 * EscrowParentHasDelegate: 'Escrow parent cannot have a delegate'
 *
 * @category Errors
 * @category generated
 */
export class EscrowParentHasDelegateError extends Error {
  readonly code: number = 0x85;
  readonly name: string = 'EscrowParentHasDelegate';
  constructor() {
    super('Escrow parent cannot have a delegate');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, EscrowParentHasDelegateError);
    }
  }
}

createErrorFromCodeLookup.set(0x85, () => new EscrowParentHasDelegateError());
createErrorFromNameLookup.set(
  'EscrowParentHasDelegate',
  () => new EscrowParentHasDelegateError()
);

/**
 * MintIsNotSigner: 'Mint needs to be signer to initialize the account'
 *
 * @category Errors
 * @category generated
 */
export class MintIsNotSignerError extends Error {
  readonly code: number = 0x86;
  readonly name: string = 'MintIsNotSigner';
  constructor() {
    super('Mint needs to be signer to initialize the account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MintIsNotSignerError);
    }
  }
}

createErrorFromCodeLookup.set(0x86, () => new MintIsNotSignerError());
createErrorFromNameLookup.set(
  'MintIsNotSigner',
  () => new MintIsNotSignerError()
);

/**
 * InvalidTokenStandard: 'Invalid token standard'
 *
 * @category Errors
 * @category generated
 */
export class InvalidTokenStandardError extends Error {
  readonly code: number = 0x87;
  readonly name: string = 'InvalidTokenStandard';
  constructor() {
    super('Invalid token standard');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidTokenStandardError);
    }
  }
}

createErrorFromCodeLookup.set(0x87, () => new InvalidTokenStandardError());
createErrorFromNameLookup.set(
  'InvalidTokenStandard',
  () => new InvalidTokenStandardError()
);

/**
 * InvalidMintForTokenStandard: 'Invalid mint account for specified token standard'
 *
 * @category Errors
 * @category generated
 */
export class InvalidMintForTokenStandardError extends Error {
  readonly code: number = 0x88;
  readonly name: string = 'InvalidMintForTokenStandard';
  constructor() {
    super('Invalid mint account for specified token standard');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidMintForTokenStandardError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x88,
  () => new InvalidMintForTokenStandardError()
);
createErrorFromNameLookup.set(
  'InvalidMintForTokenStandard',
  () => new InvalidMintForTokenStandardError()
);

/**
 * InvalidAuthorizationRules: 'Invalid authorization rules account'
 *
 * @category Errors
 * @category generated
 */
export class InvalidAuthorizationRulesError extends Error {
  readonly code: number = 0x89;
  readonly name: string = 'InvalidAuthorizationRules';
  constructor() {
    super('Invalid authorization rules account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidAuthorizationRulesError);
    }
  }
}

createErrorFromCodeLookup.set(0x89, () => new InvalidAuthorizationRulesError());
createErrorFromNameLookup.set(
  'InvalidAuthorizationRules',
  () => new InvalidAuthorizationRulesError()
);

/**
 * MissingAuthorizationRules: 'Missing authorization rules account'
 *
 * @category Errors
 * @category generated
 */
export class MissingAuthorizationRulesError extends Error {
  readonly code: number = 0x8a;
  readonly name: string = 'MissingAuthorizationRules';
  constructor() {
    super('Missing authorization rules account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingAuthorizationRulesError);
    }
  }
}

createErrorFromCodeLookup.set(0x8a, () => new MissingAuthorizationRulesError());
createErrorFromNameLookup.set(
  'MissingAuthorizationRules',
  () => new MissingAuthorizationRulesError()
);

/**
 * MissingProgrammableConfig: 'Missing programmable configuration'
 *
 * @category Errors
 * @category generated
 */
export class MissingProgrammableConfigError extends Error {
  readonly code: number = 0x8b;
  readonly name: string = 'MissingProgrammableConfig';
  constructor() {
    super('Missing programmable configuration');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingProgrammableConfigError);
    }
  }
}

createErrorFromCodeLookup.set(0x8b, () => new MissingProgrammableConfigError());
createErrorFromNameLookup.set(
  'MissingProgrammableConfig',
  () => new MissingProgrammableConfigError()
);

/**
 * InvalidProgrammableConfig: 'Invalid programmable configuration'
 *
 * @category Errors
 * @category generated
 */
export class InvalidProgrammableConfigError extends Error {
  readonly code: number = 0x8c;
  readonly name: string = 'InvalidProgrammableConfig';
  constructor() {
    super('Invalid programmable configuration');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidProgrammableConfigError);
    }
  }
}

createErrorFromCodeLookup.set(0x8c, () => new InvalidProgrammableConfigError());
createErrorFromNameLookup.set(
  'InvalidProgrammableConfig',
  () => new InvalidProgrammableConfigError()
);

/**
 * DelegateAlreadyExists: 'Delegate already exists'
 *
 * @category Errors
 * @category generated
 */
export class DelegateAlreadyExistsError extends Error {
  readonly code: number = 0x8d;
  readonly name: string = 'DelegateAlreadyExists';
  constructor() {
    super('Delegate already exists');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DelegateAlreadyExistsError);
    }
  }
}

createErrorFromCodeLookup.set(0x8d, () => new DelegateAlreadyExistsError());
createErrorFromNameLookup.set(
  'DelegateAlreadyExists',
  () => new DelegateAlreadyExistsError()
);

/**
 * DelegateNotFound: 'Delegate not found'
 *
 * @category Errors
 * @category generated
 */
export class DelegateNotFoundError extends Error {
  readonly code: number = 0x8e;
  readonly name: string = 'DelegateNotFound';
  constructor() {
    super('Delegate not found');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DelegateNotFoundError);
    }
  }
}

createErrorFromCodeLookup.set(0x8e, () => new DelegateNotFoundError());
createErrorFromNameLookup.set(
  'DelegateNotFound',
  () => new DelegateNotFoundError()
);

/**
 * MissingAccountInBuilder: 'Required account not set in instruction builder'
 *
 * @category Errors
 * @category generated
 */
export class MissingAccountInBuilderError extends Error {
  readonly code: number = 0x8f;
  readonly name: string = 'MissingAccountInBuilder';
  constructor() {
    super('Required account not set in instruction builder');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingAccountInBuilderError);
    }
  }
}

createErrorFromCodeLookup.set(0x8f, () => new MissingAccountInBuilderError());
createErrorFromNameLookup.set(
  'MissingAccountInBuilder',
  () => new MissingAccountInBuilderError()
);

/**
 * MissingArgumentInBuilder: 'Required argument not set in instruction builder'
 *
 * @category Errors
 * @category generated
 */
export class MissingArgumentInBuilderError extends Error {
  readonly code: number = 0x90;
  readonly name: string = 'MissingArgumentInBuilder';
  constructor() {
    super('Required argument not set in instruction builder');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingArgumentInBuilderError);
    }
  }
}

createErrorFromCodeLookup.set(0x90, () => new MissingArgumentInBuilderError());
createErrorFromNameLookup.set(
  'MissingArgumentInBuilder',
  () => new MissingArgumentInBuilderError()
);

/**
 * FeatureNotSupported: 'Feature not supported currently'
 *
 * @category Errors
 * @category generated
 */
export class FeatureNotSupportedError extends Error {
  readonly code: number = 0x91;
  readonly name: string = 'FeatureNotSupported';
  constructor() {
    super('Feature not supported currently');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, FeatureNotSupportedError);
    }
  }
}

createErrorFromCodeLookup.set(0x91, () => new FeatureNotSupportedError());
createErrorFromNameLookup.set(
  'FeatureNotSupported',
  () => new FeatureNotSupportedError()
);

/**
 * InvalidSystemWallet: 'Invalid system wallet'
 *
 * @category Errors
 * @category generated
 */
export class InvalidSystemWalletError extends Error {
  readonly code: number = 0x92;
  readonly name: string = 'InvalidSystemWallet';
  constructor() {
    super('Invalid system wallet');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidSystemWalletError);
    }
  }
}

createErrorFromCodeLookup.set(0x92, () => new InvalidSystemWalletError());
createErrorFromNameLookup.set(
  'InvalidSystemWallet',
  () => new InvalidSystemWalletError()
);

/**
 * OnlySaleDelegateCanTransfer: 'Only the sale delegate can transfer while its set'
 *
 * @category Errors
 * @category generated
 */
export class OnlySaleDelegateCanTransferError extends Error {
  readonly code: number = 0x93;
  readonly name: string = 'OnlySaleDelegateCanTransfer';
  constructor() {
    super('Only the sale delegate can transfer while its set');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, OnlySaleDelegateCanTransferError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x93,
  () => new OnlySaleDelegateCanTransferError()
);
createErrorFromNameLookup.set(
  'OnlySaleDelegateCanTransfer',
  () => new OnlySaleDelegateCanTransferError()
);

/**
 * MissingTokenAccount: 'Missing token account'
 *
 * @category Errors
 * @category generated
 */
export class MissingTokenAccountError extends Error {
  readonly code: number = 0x94;
  readonly name: string = 'MissingTokenAccount';
  constructor() {
    super('Missing token account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingTokenAccountError);
    }
  }
}

createErrorFromCodeLookup.set(0x94, () => new MissingTokenAccountError());
createErrorFromNameLookup.set(
  'MissingTokenAccount',
  () => new MissingTokenAccountError()
);

/**
 * MissingSplTokenProgram: 'Missing SPL token program'
 *
 * @category Errors
 * @category generated
 */
export class MissingSplTokenProgramError extends Error {
  readonly code: number = 0x95;
  readonly name: string = 'MissingSplTokenProgram';
  constructor() {
    super('Missing SPL token program');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingSplTokenProgramError);
    }
  }
}

createErrorFromCodeLookup.set(0x95, () => new MissingSplTokenProgramError());
createErrorFromNameLookup.set(
  'MissingSplTokenProgram',
  () => new MissingSplTokenProgramError()
);

/**
 * MissingAuthorizationRulesProgram: 'Missing authorization rules program'
 *
 * @category Errors
 * @category generated
 */
export class MissingAuthorizationRulesProgramError extends Error {
  readonly code: number = 0x96;
  readonly name: string = 'MissingAuthorizationRulesProgram';
  constructor() {
    super('Missing authorization rules program');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingAuthorizationRulesProgramError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x96,
  () => new MissingAuthorizationRulesProgramError()
);
createErrorFromNameLookup.set(
  'MissingAuthorizationRulesProgram',
  () => new MissingAuthorizationRulesProgramError()
);

/**
 * InvalidDelegateRoleForTransfer: 'Invalid delegate role for transfer'
 *
 * @category Errors
 * @category generated
 */
export class InvalidDelegateRoleForTransferError extends Error {
  readonly code: number = 0x97;
  readonly name: string = 'InvalidDelegateRoleForTransfer';
  constructor() {
    super('Invalid delegate role for transfer');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidDelegateRoleForTransferError);
    }
  }
}

createErrorFromCodeLookup.set(
  0x97,
  () => new InvalidDelegateRoleForTransferError()
);
createErrorFromNameLookup.set(
  'InvalidDelegateRoleForTransfer',
  () => new InvalidDelegateRoleForTransferError()
);

/**
 * InvalidTransferAuthority: 'Invalid transfer authority'
 *
 * @category Errors
 * @category generated
 */
export class InvalidTransferAuthorityError extends Error {
  readonly code: number = 0x98;
  readonly name: string = 'InvalidTransferAuthority';
  constructor() {
    super('Invalid transfer authority');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidTransferAuthorityError);
    }
  }
}

createErrorFromCodeLookup.set(0x98, () => new InvalidTransferAuthorityError());
createErrorFromNameLookup.set(
  'InvalidTransferAuthority',
  () => new InvalidTransferAuthorityError()
);

/**
 * InstructionNotSupported: 'Instruction not supported for ProgrammableNonFungible assets'
 *
 * @category Errors
 * @category generated
 */
export class InstructionNotSupportedError extends Error {
  readonly code: number = 0x99;
  readonly name: string = 'InstructionNotSupported';
  constructor() {
    super('Instruction not supported for ProgrammableNonFungible assets');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InstructionNotSupportedError);
    }
  }
}

createErrorFromCodeLookup.set(0x99, () => new InstructionNotSupportedError());
createErrorFromNameLookup.set(
  'InstructionNotSupported',
  () => new InstructionNotSupportedError()
);

/**
 * KeyMismatch: 'Public key does not match expected value'
 *
 * @category Errors
 * @category generated
 */
export class KeyMismatchError extends Error {
  readonly code: number = 0x9a;
  readonly name: string = 'KeyMismatch';
  constructor() {
    super('Public key does not match expected value');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, KeyMismatchError);
    }
  }
}

createErrorFromCodeLookup.set(0x9a, () => new KeyMismatchError());
createErrorFromNameLookup.set('KeyMismatch', () => new KeyMismatchError());

/**
 * LockedToken: 'Token is locked'
 *
 * @category Errors
 * @category generated
 */
export class LockedTokenError extends Error {
  readonly code: number = 0x9b;
  readonly name: string = 'LockedToken';
  constructor() {
    super('Token is locked');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, LockedTokenError);
    }
  }
}

createErrorFromCodeLookup.set(0x9b, () => new LockedTokenError());
createErrorFromNameLookup.set('LockedToken', () => new LockedTokenError());

/**
 * UnlockedToken: 'Token is unlocked'
 *
 * @category Errors
 * @category generated
 */
export class UnlockedTokenError extends Error {
  readonly code: number = 0x9c;
  readonly name: string = 'UnlockedToken';
  constructor() {
    super('Token is unlocked');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, UnlockedTokenError);
    }
  }
}

createErrorFromCodeLookup.set(0x9c, () => new UnlockedTokenError());
createErrorFromNameLookup.set('UnlockedToken', () => new UnlockedTokenError());

/**
 * MissingDelegateRole: 'Missing delegate role'
 *
 * @category Errors
 * @category generated
 */
export class MissingDelegateRoleError extends Error {
  readonly code: number = 0x9d;
  readonly name: string = 'MissingDelegateRole';
  constructor() {
    super('Missing delegate role');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingDelegateRoleError);
    }
  }
}

createErrorFromCodeLookup.set(0x9d, () => new MissingDelegateRoleError());
createErrorFromNameLookup.set(
  'MissingDelegateRole',
  () => new MissingDelegateRoleError()
);

/**
 * InvalidAuthorityType: 'Invalid authority type'
 *
 * @category Errors
 * @category generated
 */
export class InvalidAuthorityTypeError extends Error {
  readonly code: number = 0x9e;
  readonly name: string = 'InvalidAuthorityType';
  constructor() {
    super('Invalid authority type');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidAuthorityTypeError);
    }
  }
}

createErrorFromCodeLookup.set(0x9e, () => new InvalidAuthorityTypeError());
createErrorFromNameLookup.set(
  'InvalidAuthorityType',
  () => new InvalidAuthorityTypeError()
);

/**
 * MissingTokenRecord: 'Missing token record account'
 *
 * @category Errors
 * @category generated
 */
export class MissingTokenRecordError extends Error {
  readonly code: number = 0x9f;
  readonly name: string = 'MissingTokenRecord';
  constructor() {
    super('Missing token record account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingTokenRecordError);
    }
  }
}

createErrorFromCodeLookup.set(0x9f, () => new MissingTokenRecordError());
createErrorFromNameLookup.set(
  'MissingTokenRecord',
  () => new MissingTokenRecordError()
);

/**
 * MintSupplyMustBeZero: 'Mint supply must be zero for programmable assets'
 *
 * @category Errors
 * @category generated
 */
export class MintSupplyMustBeZeroError extends Error {
  readonly code: number = 0xa0;
  readonly name: string = 'MintSupplyMustBeZero';
  constructor() {
    super('Mint supply must be zero for programmable assets');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MintSupplyMustBeZeroError);
    }
  }
}

createErrorFromCodeLookup.set(0xa0, () => new MintSupplyMustBeZeroError());
createErrorFromNameLookup.set(
  'MintSupplyMustBeZero',
  () => new MintSupplyMustBeZeroError()
);

/**
 * DataIsEmptyOrZeroed: 'Data is empty or zeroed'
 *
 * @category Errors
 * @category generated
 */
export class DataIsEmptyOrZeroedError extends Error {
  readonly code: number = 0xa1;
  readonly name: string = 'DataIsEmptyOrZeroed';
  constructor() {
    super('Data is empty or zeroed');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DataIsEmptyOrZeroedError);
    }
  }
}

createErrorFromCodeLookup.set(0xa1, () => new DataIsEmptyOrZeroedError());
createErrorFromNameLookup.set(
  'DataIsEmptyOrZeroed',
  () => new DataIsEmptyOrZeroedError()
);

/**
 * MissingTokenOwnerAccount: 'Missing token owner'
 *
 * @category Errors
 * @category generated
 */
export class MissingTokenOwnerAccountError extends Error {
  readonly code: number = 0xa2;
  readonly name: string = 'MissingTokenOwnerAccount';
  constructor() {
    super('Missing token owner');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingTokenOwnerAccountError);
    }
  }
}

createErrorFromCodeLookup.set(0xa2, () => new MissingTokenOwnerAccountError());
createErrorFromNameLookup.set(
  'MissingTokenOwnerAccount',
  () => new MissingTokenOwnerAccountError()
);

/**
 * InvalidMasterEditionAccountLength: 'Master edition account has an invalid length'
 *
 * @category Errors
 * @category generated
 */
export class InvalidMasterEditionAccountLengthError extends Error {
  readonly code: number = 0xa3;
  readonly name: string = 'InvalidMasterEditionAccountLength';
  constructor() {
    super('Master edition account has an invalid length');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidMasterEditionAccountLengthError);
    }
  }
}

createErrorFromCodeLookup.set(
  0xa3,
  () => new InvalidMasterEditionAccountLengthError()
);
createErrorFromNameLookup.set(
  'InvalidMasterEditionAccountLength',
  () => new InvalidMasterEditionAccountLengthError()
);

/**
 * IncorrectTokenState: 'Incorrect token state'
 *
 * @category Errors
 * @category generated
 */
export class IncorrectTokenStateError extends Error {
  readonly code: number = 0xa4;
  readonly name: string = 'IncorrectTokenState';
  constructor() {
    super('Incorrect token state');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, IncorrectTokenStateError);
    }
  }
}

createErrorFromCodeLookup.set(0xa4, () => new IncorrectTokenStateError());
createErrorFromNameLookup.set(
  'IncorrectTokenState',
  () => new IncorrectTokenStateError()
);

/**
 * InvalidDelegateRole: 'Invalid delegate role'
 *
 * @category Errors
 * @category generated
 */
export class InvalidDelegateRoleError extends Error {
  readonly code: number = 0xa5;
  readonly name: string = 'InvalidDelegateRole';
  constructor() {
    super('Invalid delegate role');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidDelegateRoleError);
    }
  }
}

createErrorFromCodeLookup.set(0xa5, () => new InvalidDelegateRoleError());
createErrorFromNameLookup.set(
  'InvalidDelegateRole',
  () => new InvalidDelegateRoleError()
);

/**
 * MissingPrintSupply: 'Print supply is required for non-fungibles'
 *
 * @category Errors
 * @category generated
 */
export class MissingPrintSupplyError extends Error {
  readonly code: number = 0xa6;
  readonly name: string = 'MissingPrintSupply';
  constructor() {
    super('Print supply is required for non-fungibles');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingPrintSupplyError);
    }
  }
}

createErrorFromCodeLookup.set(0xa6, () => new MissingPrintSupplyError());
createErrorFromNameLookup.set(
  'MissingPrintSupply',
  () => new MissingPrintSupplyError()
);

/**
 * MissingMasterEditionAccount: 'Missing master edition account'
 *
 * @category Errors
 * @category generated
 */
export class MissingMasterEditionAccountError extends Error {
  readonly code: number = 0xa7;
  readonly name: string = 'MissingMasterEditionAccount';
  constructor() {
    super('Missing master edition account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingMasterEditionAccountError);
    }
  }
}

createErrorFromCodeLookup.set(
  0xa7,
  () => new MissingMasterEditionAccountError()
);
createErrorFromNameLookup.set(
  'MissingMasterEditionAccount',
  () => new MissingMasterEditionAccountError()
);

/**
 * AmountMustBeGreaterThanZero: 'Amount must be greater than zero'
 *
 * @category Errors
 * @category generated
 */
export class AmountMustBeGreaterThanZeroError extends Error {
  readonly code: number = 0xa8;
  readonly name: string = 'AmountMustBeGreaterThanZero';
  constructor() {
    super('Amount must be greater than zero');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, AmountMustBeGreaterThanZeroError);
    }
  }
}

createErrorFromCodeLookup.set(
  0xa8,
  () => new AmountMustBeGreaterThanZeroError()
);
createErrorFromNameLookup.set(
  'AmountMustBeGreaterThanZero',
  () => new AmountMustBeGreaterThanZeroError()
);

/**
 * InvalidDelegateArgs: 'Invalid delegate args'
 *
 * @category Errors
 * @category generated
 */
export class InvalidDelegateArgsError extends Error {
  readonly code: number = 0xa9;
  readonly name: string = 'InvalidDelegateArgs';
  constructor() {
    super('Invalid delegate args');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidDelegateArgsError);
    }
  }
}

createErrorFromCodeLookup.set(0xa9, () => new InvalidDelegateArgsError());
createErrorFromNameLookup.set(
  'InvalidDelegateArgs',
  () => new InvalidDelegateArgsError()
);

/**
 * MissingLockedTransferAddress: 'Missing address for locked transfer'
 *
 * @category Errors
 * @category generated
 */
export class MissingLockedTransferAddressError extends Error {
  readonly code: number = 0xaa;
  readonly name: string = 'MissingLockedTransferAddress';
  constructor() {
    super('Missing address for locked transfer');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingLockedTransferAddressError);
    }
  }
}

createErrorFromCodeLookup.set(
  0xaa,
  () => new MissingLockedTransferAddressError()
);
createErrorFromNameLookup.set(
  'MissingLockedTransferAddress',
  () => new MissingLockedTransferAddressError()
);

/**
 * InvalidLockedTransferAddress: 'Invalid destination address for locked transfer'
 *
 * @category Errors
 * @category generated
 */
export class InvalidLockedTransferAddressError extends Error {
  readonly code: number = 0xab;
  readonly name: string = 'InvalidLockedTransferAddress';
  constructor() {
    super('Invalid destination address for locked transfer');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidLockedTransferAddressError);
    }
  }
}

createErrorFromCodeLookup.set(
  0xab,
  () => new InvalidLockedTransferAddressError()
);
createErrorFromNameLookup.set(
  'InvalidLockedTransferAddress',
  () => new InvalidLockedTransferAddressError()
);

/**
 * DataIncrementLimitExceeded: 'Exceeded account realloc increase limit'
 *
 * @category Errors
 * @category generated
 */
export class DataIncrementLimitExceededError extends Error {
  readonly code: number = 0xac;
  readonly name: string = 'DataIncrementLimitExceeded';
  constructor() {
    super('Exceeded account realloc increase limit');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, DataIncrementLimitExceededError);
    }
  }
}

createErrorFromCodeLookup.set(
  0xac,
  () => new DataIncrementLimitExceededError()
);
createErrorFromNameLookup.set(
  'DataIncrementLimitExceeded',
  () => new DataIncrementLimitExceededError()
);

/**
 * CannotUpdateAssetWithDelegate: 'Cannot update the rule set of a programmable asset that has a delegate'
 *
 * @category Errors
 * @category generated
 */
export class CannotUpdateAssetWithDelegateError extends Error {
  readonly code: number = 0xad;
  readonly name: string = 'CannotUpdateAssetWithDelegate';
  constructor() {
    super(
      'Cannot update the rule set of a programmable asset that has a delegate'
    );
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CannotUpdateAssetWithDelegateError);
    }
  }
}

createErrorFromCodeLookup.set(
  0xad,
  () => new CannotUpdateAssetWithDelegateError()
);
createErrorFromNameLookup.set(
  'CannotUpdateAssetWithDelegate',
  () => new CannotUpdateAssetWithDelegateError()
);

/**
 * InvalidAmount: 'Invalid token amount for this operation or token standard'
 *
 * @category Errors
 * @category generated
 */
export class InvalidAmountError extends Error {
  readonly code: number = 0xae;
  readonly name: string = 'InvalidAmount';
  constructor() {
    super('Invalid token amount for this operation or token standard');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidAmountError);
    }
  }
}

createErrorFromCodeLookup.set(0xae, () => new InvalidAmountError());
createErrorFromNameLookup.set('InvalidAmount', () => new InvalidAmountError());

/**
 * MissingMasterEditionMintAccount: 'Missing master edition mint account'
 *
 * @category Errors
 * @category generated
 */
export class MissingMasterEditionMintAccountError extends Error {
  readonly code: number = 0xaf;
  readonly name: string = 'MissingMasterEditionMintAccount';
  constructor() {
    super('Missing master edition mint account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingMasterEditionMintAccountError);
    }
  }
}

createErrorFromCodeLookup.set(
  0xaf,
  () => new MissingMasterEditionMintAccountError()
);
createErrorFromNameLookup.set(
  'MissingMasterEditionMintAccount',
  () => new MissingMasterEditionMintAccountError()
);

/**
 * MissingMasterEditionTokenAccount: 'Missing master edition token account'
 *
 * @category Errors
 * @category generated
 */
export class MissingMasterEditionTokenAccountError extends Error {
  readonly code: number = 0xb0;
  readonly name: string = 'MissingMasterEditionTokenAccount';
  constructor() {
    super('Missing master edition token account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingMasterEditionTokenAccountError);
    }
  }
}

createErrorFromCodeLookup.set(
  0xb0,
  () => new MissingMasterEditionTokenAccountError()
);
createErrorFromNameLookup.set(
  'MissingMasterEditionTokenAccount',
  () => new MissingMasterEditionTokenAccountError()
);

/**
 * MissingEditionMarkerAccount: 'Missing edition marker account'
 *
 * @category Errors
 * @category generated
 */
export class MissingEditionMarkerAccountError extends Error {
  readonly code: number = 0xb1;
  readonly name: string = 'MissingEditionMarkerAccount';
  constructor() {
    super('Missing edition marker account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingEditionMarkerAccountError);
    }
  }
}

createErrorFromCodeLookup.set(
  0xb1,
  () => new MissingEditionMarkerAccountError()
);
createErrorFromNameLookup.set(
  'MissingEditionMarkerAccount',
  () => new MissingEditionMarkerAccountError()
);

/**
 * CannotBurnWithDelegate: 'Cannot burn while persistent delegate is set'
 *
 * @category Errors
 * @category generated
 */
export class CannotBurnWithDelegateError extends Error {
  readonly code: number = 0xb2;
  readonly name: string = 'CannotBurnWithDelegate';
  constructor() {
    super('Cannot burn while persistent delegate is set');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, CannotBurnWithDelegateError);
    }
  }
}

createErrorFromCodeLookup.set(0xb2, () => new CannotBurnWithDelegateError());
createErrorFromNameLookup.set(
  'CannotBurnWithDelegate',
  () => new CannotBurnWithDelegateError()
);

/**
 * MissingEdition: 'Missing edition account'
 *
 * @category Errors
 * @category generated
 */
export class MissingEditionError extends Error {
  readonly code: number = 0xb3;
  readonly name: string = 'MissingEdition';
  constructor() {
    super('Missing edition account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingEditionError);
    }
  }
}

createErrorFromCodeLookup.set(0xb3, () => new MissingEditionError());
createErrorFromNameLookup.set(
  'MissingEdition',
  () => new MissingEditionError()
);

/**
 * InvalidAssociatedTokenAccountProgram: 'Invalid Associated Token Account Program'
 *
 * @category Errors
 * @category generated
 */
export class InvalidAssociatedTokenAccountProgramError extends Error {
  readonly code: number = 0xb4;
  readonly name: string = 'InvalidAssociatedTokenAccountProgram';
  constructor() {
    super('Invalid Associated Token Account Program');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidAssociatedTokenAccountProgramError);
    }
  }
}

createErrorFromCodeLookup.set(
  0xb4,
  () => new InvalidAssociatedTokenAccountProgramError()
);
createErrorFromNameLookup.set(
  'InvalidAssociatedTokenAccountProgram',
  () => new InvalidAssociatedTokenAccountProgramError()
);

/**
 * InvalidInstructionsSysvar: 'Invalid InstructionsSysvar'
 *
 * @category Errors
 * @category generated
 */
export class InvalidInstructionsSysvarError extends Error {
  readonly code: number = 0xb5;
  readonly name: string = 'InvalidInstructionsSysvar';
  constructor() {
    super('Invalid InstructionsSysvar');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidInstructionsSysvarError);
    }
  }
}

createErrorFromCodeLookup.set(0xb5, () => new InvalidInstructionsSysvarError());
createErrorFromNameLookup.set(
  'InvalidInstructionsSysvar',
  () => new InvalidInstructionsSysvarError()
);

/**
 * InvalidParentAccounts: 'Invalid or Unneeded parent accounts'
 *
 * @category Errors
 * @category generated
 */
export class InvalidParentAccountsError extends Error {
  readonly code: number = 0xb6;
  readonly name: string = 'InvalidParentAccounts';
  constructor() {
    super('Invalid or Unneeded parent accounts');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidParentAccountsError);
    }
  }
}

createErrorFromCodeLookup.set(0xb6, () => new InvalidParentAccountsError());
createErrorFromNameLookup.set(
  'InvalidParentAccounts',
  () => new InvalidParentAccountsError()
);

/**
 * InvalidUpdateArgs: 'Authority cannot apply all update args'
 *
 * @category Errors
 * @category generated
 */
export class InvalidUpdateArgsError extends Error {
  readonly code: number = 0xb7;
  readonly name: string = 'InvalidUpdateArgs';
  constructor() {
    super('Authority cannot apply all update args');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidUpdateArgsError);
    }
  }
}

createErrorFromCodeLookup.set(0xb7, () => new InvalidUpdateArgsError());
createErrorFromNameLookup.set(
  'InvalidUpdateArgs',
  () => new InvalidUpdateArgsError()
);

/**
 * InsufficientTokenBalance: 'Token account does not have enough tokens'
 *
 * @category Errors
 * @category generated
 */
export class InsufficientTokenBalanceError extends Error {
  readonly code: number = 0xb8;
  readonly name: string = 'InsufficientTokenBalance';
  constructor() {
    super('Token account does not have enough tokens');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InsufficientTokenBalanceError);
    }
  }
}

createErrorFromCodeLookup.set(0xb8, () => new InsufficientTokenBalanceError());
createErrorFromNameLookup.set(
  'InsufficientTokenBalance',
  () => new InsufficientTokenBalanceError()
);

/**
 * MissingCollectionMint: 'Missing collection account'
 *
 * @category Errors
 * @category generated
 */
export class MissingCollectionMintError extends Error {
  readonly code: number = 0xb9;
  readonly name: string = 'MissingCollectionMint';
  constructor() {
    super('Missing collection account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingCollectionMintError);
    }
  }
}

createErrorFromCodeLookup.set(0xb9, () => new MissingCollectionMintError());
createErrorFromNameLookup.set(
  'MissingCollectionMint',
  () => new MissingCollectionMintError()
);

/**
 * MissingCollectionMasterEdition: 'Missing collection master edition account'
 *
 * @category Errors
 * @category generated
 */
export class MissingCollectionMasterEditionError extends Error {
  readonly code: number = 0xba;
  readonly name: string = 'MissingCollectionMasterEdition';
  constructor() {
    super('Missing collection master edition account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingCollectionMasterEditionError);
    }
  }
}

createErrorFromCodeLookup.set(
  0xba,
  () => new MissingCollectionMasterEditionError()
);
createErrorFromNameLookup.set(
  'MissingCollectionMasterEdition',
  () => new MissingCollectionMasterEditionError()
);

/**
 * InvalidTokenRecord: 'Invalid token record account'
 *
 * @category Errors
 * @category generated
 */
export class InvalidTokenRecordError extends Error {
  readonly code: number = 0xbb;
  readonly name: string = 'InvalidTokenRecord';
  constructor() {
    super('Invalid token record account');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidTokenRecordError);
    }
  }
}

createErrorFromCodeLookup.set(0xbb, () => new InvalidTokenRecordError());
createErrorFromNameLookup.set(
  'InvalidTokenRecord',
  () => new InvalidTokenRecordError()
);

/**
 * InvalidCloseAuthority: 'The close authority needs to be revoked by the Utility Delegate'
 *
 * @category Errors
 * @category generated
 */
export class InvalidCloseAuthorityError extends Error {
  readonly code: number = 0xbc;
  readonly name: string = 'InvalidCloseAuthority';
  constructor() {
    super('The close authority needs to be revoked by the Utility Delegate');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidCloseAuthorityError);
    }
  }
}

createErrorFromCodeLookup.set(0xbc, () => new InvalidCloseAuthorityError());
createErrorFromNameLookup.set(
  'InvalidCloseAuthority',
  () => new InvalidCloseAuthorityError()
);

/**
 * InvalidInstruction: 'Invalid or removed instruction'
 *
 * @category Errors
 * @category generated
 */
export class InvalidInstructionError extends Error {
  readonly code: number = 0xbd;
  readonly name: string = 'InvalidInstruction';
  constructor() {
    super('Invalid or removed instruction');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidInstructionError);
    }
  }
}

createErrorFromCodeLookup.set(0xbd, () => new InvalidInstructionError());
createErrorFromNameLookup.set(
  'InvalidInstruction',
  () => new InvalidInstructionError()
);

/**
 * MissingDelegateRecord: 'Missing delegate record'
 *
 * @category Errors
 * @category generated
 */
export class MissingDelegateRecordError extends Error {
  readonly code: number = 0xbe;
  readonly name: string = 'MissingDelegateRecord';
  constructor() {
    super('Missing delegate record');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, MissingDelegateRecordError);
    }
  }
}

createErrorFromCodeLookup.set(0xbe, () => new MissingDelegateRecordError());
createErrorFromNameLookup.set(
  'MissingDelegateRecord',
  () => new MissingDelegateRecordError()
);

/**
 * InvalidFeeAccount: ''
 *
 * @category Errors
 * @category generated
 */
export class InvalidFeeAccountError extends Error {
  readonly code: number = 0xbf;
  readonly name: string = 'InvalidFeeAccount';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidFeeAccountError);
    }
  }
}

createErrorFromCodeLookup.set(0xbf, () => new InvalidFeeAccountError());
createErrorFromNameLookup.set(
  'InvalidFeeAccount',
  () => new InvalidFeeAccountError()
);

/**
 * InvalidMetadataFlags: ''
 *
 * @category Errors
 * @category generated
 */
export class InvalidMetadataFlagsError extends Error {
  readonly code: number = 0xc0;
  readonly name: string = 'InvalidMetadataFlags';
  constructor() {
    super('');
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidMetadataFlagsError);
    }
  }
}

createErrorFromCodeLookup.set(0xc0, () => new InvalidMetadataFlagsError());
createErrorFromNameLookup.set(
  'InvalidMetadataFlags',
  () => new InvalidMetadataFlagsError()
);

/**
 * Attempts to resolve a custom program error from the provided error code.
 * @category Errors
 * @category generated
 */
export function errorFromCode(code: number): MaybeErrorWithCode {
  const createError = createErrorFromCodeLookup.get(code);
  return createError != null ? createError() : null;
}

/**
 * Attempts to resolve a custom program error from the provided error name, i.e. 'Unauthorized'.
 * @category Errors
 * @category generated
 */
export function errorFromName(name: string): MaybeErrorWithCode {
  const createError = createErrorFromNameLookup.get(name);
  return createError != null ? createError() : null;
}
