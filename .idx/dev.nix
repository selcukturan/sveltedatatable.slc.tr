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
    "usernamehw.errorlens"
    "dbaeumer.vscode-eslint"
    "github.github-vscode-theme"
    "eamodio.gitlens"
    "wix.vscode-import-cost"
    "oderwat.indent-rainbow"
    "xabikos.javascriptsnippets"
    "zaaack.markdown-editor"
    "zhuangtongfa.material-theme"
    "codeandstuff.package-json-upgrade"
    "csstools.postcss"
    "esbenp.prettier-vscode"
    "yoavbls.pretty-ts-errors"
    "chanzhaoyu.svelte-5-snippets"
    "pivaszbs.svelte-autoimport"
    "svelte.svelte-vscode"
    "bradlc.vscode-tailwindcss"
  ];  
}