

## Useful terminology used by the renderer
### Understanding the raw JSON structure

Each individual episode is a `json` file of an object. Inside the object, the kv pair "DataList" is bound to an array of objects.

These objects inside the array are referred to as  `rawTokens` (sg. `rawToken). The structure cared by the LADR is well shown in the interface key inside `ProcessScript.ts`.


