import { createSearchParams, history, useLocation } from "umi";
import ss from "@/utils/sessionStorage";

/**
 * 此方法会跳转到 redirect 参数所在的位置
 * sessionStorage里有redirect优先跳转
 */
export function goto() {
  if (!history) return;
  const { search } = window.location;
  setTimeout(() => {
    let finalRedirect;
    const sessionRedirect = ss.get("redirect");
    if (sessionRedirect) {
      finalRedirect = sessionRedirect;
      ss.remove("redirect");
    } else {
      const redirect = createSearchParams(search).get("redirect");
      finalRedirect = redirect;
    }

    console.log({ finalRedirect });

    history.replace(finalRedirect || "/");
  }, 200);
}
