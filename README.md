# interview-proofreader

インタビューの文字起こしをLLMで校正するシステム。

> [!CAUTION]
> Cloudflare Functionsの無料枠で動作させるために、FunctionsからフロントエンドにAPIキーを送信し、フロントエンドからGemini APIにアクセスするように設計されています。
>
> **必ずCloudflare Accessによるアクセス制限を設けてください**。さらに、環境変数`X_AUTH`に十分な長さのランダムな文字列を設定し、Cloudflareの変換ルールで`x-auth`ヘッダーにその値を設定することで、Cloudflare Access経由でないアクセス（`xxxxx.workers.dev`への直接アクセス）を拒否します。
