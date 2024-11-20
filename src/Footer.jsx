import React from 'react';
import { FaDiscord, FaTelegram, FaGithub } from 'react-icons/fa';
import { GrYoutube } from 'react-icons/gr';

export default function Footer() {
  return (
    <footer className="w-full text-2xl py-10 text-red-300 flex flex-col items-center space-y-4 font-mono">
      <p className="text-sm">© 2024 PANIKA-MODS. All Rights Reserved.</p>
      <div className="flex space-x-4">
        <a href="https://discord.gg/panikamods" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition duration-300">
          <FaDiscord size={32} />
        </a>
        <a href="https://www.youtube.com/@Dionisz" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition duration-300">
          <GrYoutube size={32} />
        </a>
        <a href="https://t.me/panikamedia" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition duration-300">
          <FaTelegram size={32} />
        </a>
        <a href="https://github.com/hikaqq" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition duration-300">
          <FaGithub size={32} />
        </a>
      </div>
    </footer>
  );
}
