/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_COGNITO_ID: string
    readonly VITE_COGNITO_CLIENT_ID: string
    readonly VITE_USE_MOCKS?: string
    readonly VITE_COGNITO_CLIENT_SECRET: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
