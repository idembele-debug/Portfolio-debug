<?php

return [
    'nav' => [
        'about' => 'About',
        'projects' => 'Projects',
        'contact' => 'Contact',
    ],
    'hero' => [
        'title' => "Engineering\nstudent.",
        'label' => "Engineering & artificial intelligence",
        'since' => 'Since 2023',
        'shortcut' => 'Press / to focus the terminal',
    ],
    'filters' => [
        'all' => 'All',
        'academic' => 'Academic',
        'personal' => 'Personal',
        'count' => ':count project|:count projects',
    ],
    'ui' => [
        'close' => '✕ close',
        'download_cv' => 'Download my CV',
        'contact_me' => 'Contact me',
        'theme_title' => 'Toggle dark/light mode',
    ],
    'terminal' => [
        // Commands must stay fixed; only descriptions change.
        'welcome' => 'Welcome to ISSA D. terminal. Type "help" for commands.',
        'placeholder' => "type 'help'",
        'help_title' => 'Available commands:',
        'help_lines' => [
            'whoami' => 'about me',
            'projects' => 'my work',
            'skills' => 'tech stack',
            'contact' => 'get in touch',
            'histoire' => 'my story',
            'clear' => 'clear terminal',
        ],
        'opening_about' => 'Opening “About”...',
        'opening_contact' => 'Opening “Contact”...',
        'opening_story' => 'Opening “Story”...',
        'projects_scroll' => ':count projects found. Scrolling to projects...',
        'not_found' => 'command not found: :cmd — try help',
    ],
];

