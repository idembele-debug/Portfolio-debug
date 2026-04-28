<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio ISSA D.</title>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&display=swap" rel="stylesheet">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @stack('styles')
</head>
<body>
    @include('partials.header')

    @yield('content')

    @include('partials.about')
    @include('partials.history')
    @include('partials.contact')

    <script>
        window.__OPEN_OVERLAY__ = @json($openOverlay ?? null);
        window.__LOCALE__ = @json(app()->getLocale());
        window.__I18N__ = @json(__('portfolio'));
    </script>

    @stack('scripts')
</body>
</html>