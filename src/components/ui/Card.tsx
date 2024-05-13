export default function Card({ children }: {children: JSX.Element}) {
  return (
    <div className="card w-100 md:w-6/12 mx-auto bg-base-200 shadow-xl">
      <div className="card-body">
        { children }
      </div>
    </div>
  )
}