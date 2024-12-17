{pkgs}: {
  channel = "stable-24.11"; # or "unstable"
  packages = [
    pkgs.nodejs_22
    # pkgs.sudo
  ];
  services.docker.enable = true;
  env = {
    HELLO = "World";
  };
  idx.previews = {
    enable = true;
    previews = {
      web = {
        manager = "web";
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];        
        env = {
          HELLO = "world";
        };
      };
    };
  };
  idx.extensions = [
    "dbaeumer.vscode-eslint"
    "github.github-vscode-theme"
    "wix.vscode-import-cost"
    "xabikos.javascriptsnippets"
    "zaaack.markdown-editor"
    "pkief.material-icon-theme"
    "zhuangtongfa.material-theme"
    "codeandstuff.package-json-upgrade"
    "csstools.postcss"
    "esbenp.prettier-vscode"
    "thebearingedge.vscode-sql-lit"
    "chanzhaoyu.svelte-5-snippets"
    "svelte.svelte-vscode"
    "bradlc.vscode-tailwindcss"
  ];  
}