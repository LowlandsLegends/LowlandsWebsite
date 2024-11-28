import DiscordIcon from '@images/Discord_Icon_Foot.svg';

export default function Footer() {
    return (
        <footer className="h-10 fixed z-10 bottom-0 w-full backdrop-blur-sm rounded-md shadow-md">
            <div className="flex h-full items-center justify-between px-2">
                {/* Discord Icon on the Left */}
                <a
                    href="https://discord.gg/your-invite-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors flex-shrink-0"
                >
                    <span className="sr-only">Join our Discord server</span>
                    <DiscordIcon className="w-7 h-7" alt="Discord Icon" />
                </a>

                {/* Text on the Right */}
                <p className="text-white/70 text-sm flex-shrink-0 ml-auto">© 2024 LowlandsLegends.eu</p>
            </div>
        </footer>
    );
}