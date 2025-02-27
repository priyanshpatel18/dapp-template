/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/my_program.json`.
 */
export type MyProgram = {
  "address": "DfvLtstq7MQTafdSMSNkFtyBhiLr4uwNzY6rX7W4cp84",
  "metadata": {
    "name": "myProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with anchor"
  },
  "instructions": [
    {
      "name": "initialize",
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [],
      "args": []
    }
  ]
};
