export default function Avatar({img_path, height = 24}: {img_path?: string, height?: number}) {
  return (
    <div className="avatar mb-4">
        <div className={`w-${height} rounded`}>
          {img_path ? <img src={`https://wlnutzihivmeekodkpeq.supabase.co/storage/v1/object/public/avatars/${img_path}`} alt="" />
            : <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />}
        </div>
      </div>
  )
}