import { defineWorld } from "@latticexyz/world";

export default defineWorld({
  namespace: "app",
  tables: {
    Index: {
      schema: { index: "uint256" },
      key: [],
    },
  },
});
