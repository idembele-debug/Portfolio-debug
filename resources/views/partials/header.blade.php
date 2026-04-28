<header>
    <a href="{{ route('home') }}" class="logo">
        Portfolio ISSA D
    </a>

    <nav>
        <a href="{{ route('about') }}">{{ __('portfolio.nav.about') }}</a>
        <a href="{{ route('home') }}#projects">{{ __('portfolio.nav.projects') }}</a>
        <a href="{{ route('contact') }}">{{ __('portfolio.nav.contact') }}</a>

        <div class="nav-controls">
            <button class="theme-btn" onclick="toggleTheme()" title="{{ __('portfolio.ui.theme_title') }}">◐</button>
            <span style="color:var(--border); font-size:12px">|</span>
            <a
                class="lang-btn"
                id="lang-btn"
                href="{{ route('lang.switch', ['locale' => app()->getLocale() === 'fr' ? 'en' : 'fr']) }}"
            >
                {{ app()->getLocale() === 'fr' ? 'EN' : 'FR' }}
            </a>
        </div>
    </nav>
</header>