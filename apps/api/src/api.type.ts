export type TStatus = {
    version: {
        full: `${TStatus['version']['major']}.${TStatus['version']['minor']}.${TStatus['version']['fix']}`;
        major: number;
        minor: number;
        fix: number;
    };
    typescriptCompiler: {
        full: `${TStatus['typescriptCompiler']['major']}.${TStatus['typescriptCompiler']['minor']}.${TStatus['version']['fix']}`;
        major: number;
        minor: number;
        fix: number;
    };
};
