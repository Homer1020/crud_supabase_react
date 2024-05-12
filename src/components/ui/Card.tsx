export default function Card({ children }: {children: JSX.Element}) {
  return (
    <div className="card w-4/12 bg-base-200 shadow-xl">
      <div className="card-body">
        { children }
      </div>
    </div>
  )
}