<div class="hero">

    @php($heroTitle = __('portfolio.hero.title'))
    <h1>{!! nl2br(e($heroTitle)) !!}</h1>
    <p class="hero-label">{{ __('portfolio.hero.label') }}</p>
    <div class="hero-meta">
        <span>{{ __('portfolio.hero.since') }}</span>
        <span class="shortcut" onclick="focusTerminal()">
            {!! str_replace('/', '<kbd>/</kbd>', e(__('portfolio.hero.shortcut'))) !!}
        </span>
    </div>

    {{-- Interactive Terminal --}}
    <div class="terminal-wrap">
        <div class="terminal">
            <div class="terminal-bar">
                <span class="dot r"></span>
                <span class="dot y"></span>
                <span class="dot g"></span>
                <span class="terminal-title">issad@portfolio:~</span>
            </div>
            <div class="terminal-body" id="terminal-output"></div>
        </div>
    </div>
</div>