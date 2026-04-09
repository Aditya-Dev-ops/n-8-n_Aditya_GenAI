import { AppHeader } from "@/components/custom/rest-header";


const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
    <AppHeader/>
     <main
      className='flex-1'
     >        
       {children}
    </main>
    </>
  )
}

export default layout;