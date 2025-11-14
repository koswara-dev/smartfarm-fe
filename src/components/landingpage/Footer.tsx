import React, { useState, useEffect } from 'react'

interface ContactInfo {
  email: string | null
  phone: string
  address: string
}

interface SocialMediaLink {
  url: string
  icon: string
}

interface FooterData {
  appName: string
  logoFooter: string
  footerMotto: string
  contact: ContactInfo
  socialMedia: {
    facebook?: SocialMediaLink
    twitter?: SocialMediaLink
    instagram?: SocialMediaLink
  }
}

const Footer: React.FC = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null)

  useEffect(() => {
    fetch('/assets/data.json')
      .then((response) => response.json())
      .then((data) => setFooterData(data))
      .catch((error) => console.error('Error loading footer data:', error))
  }, [])

  if (!footerData) {
    return null // Or a loading spinner
  }

  const { appName, logoFooter, footerMotto, contact, socialMedia } = footerData

  return (
    <footer className="bg-gray-800 text-gray-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3
            id="footer-app-name"
            className="text-2xl font-bold text-white mb-4"
          >
            {appName}
          </h3>
          <img
            id="footer-logo"
            src={logoFooter}
            alt={`${appName} Logo`}
            className="h-20 mb-4"
          />
          <p id="footer-motto" className="text-gray-400">
            {footerMotto}
          </p>
        </div>
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Menu Cepat</h4>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white">
                Tentang
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-white">
                Fitur
              </a>
            </li>
            <li>
              <a href="#products" className="hover:text-white">
                Produk
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white">
                Kontak
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Kontak Kami</h4>
          <ul className="space-y-2">
            <li id="contact-email">
              Email: {contact.email || 'info@smartfarm.com'}
            </li>
            <li id="contact-phone">Telepon: {contact.phone}</li>
            <li id="contact-address">Alamat: {contact.address}</li>
          </ul>
          <div id="social-media-links" className="flex space-x-4 mt-4">
            {Object.entries(socialMedia).map(
              ([platform, social]) =>
                social && (
                  <a
                    key={platform}
                    href={social.url}
                    className="text-gray-400 hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={social.icon}
                      alt={platform.charAt(0).toUpperCase() + platform.slice(1)}
                    />
                  </a>
                )
            )}
          </div>
        </div>
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white">
                Kebijakan Privasi
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Syarat & Ketentuan
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-8">
        &copy; 2025 {appName}. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
