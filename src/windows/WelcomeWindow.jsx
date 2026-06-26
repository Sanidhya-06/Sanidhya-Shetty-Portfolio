export default function WelcomeWindow() {
  return (
    <div
      className="flex flex-col items-center h-full px-8"
      style={{ background: "transparent" }}
    >
      <div className="flex flex-1 items-center justify-center">
        <p
          className="text-center leading-none"
          style={{
            fontFamily: '"Homemade Apple", cursive',
            fontSize: "72px",
            color: "var(--charcoal)",
            fontWeight: 400,
            letterSpacing: 0,
            paddingLeft: "16px",
          }}
        >
          Portfolio
        </p>
      </div>
      <p
        className="text-center"
        style={{
          fontFamily: "Inter, sans-serif",
          fontSize: "12px",
          color: "var(--text-muted)",
          letterSpacing: "0.04em",
          marginBottom: "16px",
        }}
      >
        it's a desktop. explore yourself.
      </p>
    </div>
  )
}
