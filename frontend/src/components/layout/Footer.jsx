function Footer({ companyName, date }) {
    return (
        <footer className='bg-gray-800 text-gray-400 text-center py-4 mt-8'>
            <p>&copy; {date} - {companyName} - All rights reserved</p>
        </footer>
    )
}

export default Footer;