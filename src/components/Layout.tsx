import {FC, PropsWithChildren} from 'react'
import Header from "./header/Header";
import Footer from "./footer/Footer";


const Layout: FC<PropsWithChildren> = ({children}) => {
    return (
        <>
            <main className={'bg-gray-900'}>
                <Header/>
                {children}
              <Footer/>
            </main>
        </>
    )
}

export default Layout
