import path from "node:path";
import fs from "node:fs/promises";
export const packageAfterPrune = async (config, buildPath) => {
  console.log("ca joue le hook")
  const gypPath = path.join(
    buildPath,
    'ressources',
    'app',
    'build',
    'node_gyp_bins'
  );
  
  await fs.rm(gypPath, {recursive: true, force: true})
}
