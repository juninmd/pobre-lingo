// Override para compatibilidade entre Radix UI e React 19
// Os tipos do Radix UI ainda não suportam totalmente React 19
// Este arquivo força o TypeScript a aceitar os tipos

import "@radix-ui/react-separator";
import "@radix-ui/react-scroll-area";
import "@radix-ui/react-progress";
import "@radix-ui/react-radio-group";
import "@radix-ui/react-label";
import "@radix-ui/react-tooltip";
import "@radix-ui/react-toast";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";

declare module "react" {
  // Permite bigint como ReactNode (mudança do React 19)
  interface DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES {
    bigint: true;
  }
}
