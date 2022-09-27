import type { Settings as ProSettings } from "@ant-design/pro-layout";

type DefaultSettings = Partial<ProSettings> & {
  pwa: boolean;
};

const layoutSettings: DefaultSettings = {
  navTheme: "dark",
  // 拂晓蓝
  primaryColor: "#1890ff",
  layout: "side",
  contentWidth: "Fluid",
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  pwa: false,
};

export default layoutSettings;
