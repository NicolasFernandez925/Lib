import CopyWebpackPlugin = require("copy-webpack-plugin");
export const entry: string;
export namespace output {
    const path: string;
    const filename: string;
    const clean: boolean;
}
export namespace resolve {
    const extensions: string[];
}
export namespace module {
    const rules: ({
        test: RegExp;
        use: string;
        exclude: RegExp[];
    } | {
        test: RegExp;
        use: string[];
        exclude?: undefined;
    })[];
}
export const plugins: CopyWebpackPlugin[];
export const externals: {
    react: string;
    'react-dom': string;
};
