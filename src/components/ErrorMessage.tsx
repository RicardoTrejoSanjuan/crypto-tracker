export default function ErrorMessage({children}: { children: React.ReactNode}) {
  return (
    <div className="text-error">{children}</div>
  )
}
