<header>
    <a href="{{ route('home') }}" class="logo">
        Portfolio ISSA D
    </a>

    <nav>
        <a onclick="openAbout()">A Propos de Moi</a>
        <a href="#projects">Projets</a>
        <a onclick="openContact(); return false;">Contact</a>

        <div class="nav-controls">
            <button class="theme-btn" onclick="toggleTheme()" title="Toggle dark/light mode">◐</button>
            <span style="color:var(--border); font-size:12px">|</span>
            <button class="lang-btn" id="lang-btn" onclick="toggleLang()">EN</button>
        </div>
    </nav>
</header>