import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex items-center justify-center mb-8">
      <Image
        src="/logo.png" // Replace with your actual logo path
        alt="DeviceHaven Logo"
        width={250}
        height={250}
        className="rounded-full"
      />
    </div>
  )
}

