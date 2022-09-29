import { Tooltip } from "antd";
import Avatar from "./AvatarDropdown";
import styles from "./index.less";
import { baseSrc } from "@/utils/envConstant";

const GlobalHeaderRight = () => {
  const className = styles.right;

  return (
    <div className={className}>
      <Tooltip title="使用文档">
        <a
          style={{
            color: "inherit",
          }}
          target="_blank"
          href={`${baseSrc()}/file/template/%E6%97%A0%E9%94%A1%E5%9C%B0%E9%93%81%E8%B5%84%E6%BA%90%E7%BB%8F%E8%90%A5%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%E7%B3%BB%E7%BB%9F%E6%93%8D%E4%BD%9C%E6%89%8B%E5%86%8C.pdf`}
          rel="noopener noreferrer"
          className={styles.action}
        >
          使用文档
        </a>
      </Tooltip>
      <Avatar />
    </div>
  );
};

export default GlobalHeaderRight;
