import type { CSSProperties, ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div style={styles.wrapper}>
      {children}
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    width: "100%",
    overflowX: "hidden",
    background: "#f6f7fb",
    color: "#5278d8",
    minHeight: "100vh",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  }
};
