<!-- PROJECTS -->
<section id="projects">
    <div class="section-label"> projets</div>

    {{-- Filters --}}
    <div class="filters">
        <button class="filter-btn active" onclick="filterProjects('all', this)">{{ __('portfolio.filters.all') }}</button>
        <button class="filter-btn" onclick="filterProjects('academic', this)">{{ __('portfolio.filters.academic') }}</button>
        <button class="filter-btn" onclick="filterProjects('personal', this)">{{ __('portfolio.filters.personal') }}</button>
        <span class="projects-count" id="proj-count"></span>
    </div>

    {{-- Grid --}}
    <div class="projects-grid" id="projects-grid">

        {{-- Project 1: Auto Market Analysis --}}
        <div class="project-card fade-in" data-type="academic">
            <div class="project-preview preview-blue">
                <div class="preview-code">
                    import pandas as pd<br>
                    import matplotlib<br>
                    import numpy as np<br><br>
                    df.plot(kind='bar')<br>
                    # Market analysis 2024
                </div>
            </div>

Académique


            <div class="project-header">
                <span class="project-name">Analyse du marché automobile</span>
                <span class="project-type" style="color:var(--yellow); border-color:var(--yellow)">Academique</span>
            </div>
            <p class="project-desc">
                Analyse des données du marché automobile à l'aide de Pandas, Matplotlib et Numpy pour le traitement et la visualisation.
            </p>
            <div class="project-tags">
                <span class="tag tag-python">Python</span>
                <span class="tag tag-pandas">Pandas</span>
                <span class="tag tag-numpy">Numpy</span>
            </div>
        </div>

        {{-- Project 2: HESTIM Game --}}
        <div class="project-card fade-in" data-type="academic">
            <div class="project-preview preview-purple">
                <div class="preview-code">
                    JEU HESTIM<br><br>
                    Joueur 1 vs Joueur 2<br>
                    GUI: Tkinter<br>
                    Lang: Python
                </div>
            </div>
            <div class="project-header">
                <span class="project-name">HESTIM Game</span>
                <span class="project-type" style="color:var(--yellow); border-color:var(--yellow)">Academique</span>
            </div>
            <p class="project-desc">
                Jeu de société avec interface graphique simulant les interactions entre deux joueurs. Construit avec Python.
            </p>
            <div class="project-tags">
                <span class="tag tag-python">Python</span>
                <span class="tag tag-c">Tkinter</span>
            </div>
        </div>

        {{-- Project 3: Jardinage App --}}
        <div class="project-card fade-in" data-type="academic">
            <div class="project-preview preview-green">
                <div class="preview-code">
                    Jardinage App<br><br>
                    FLASK + HTML/CSS<br>
                    Team project 2025<br>
                    ✓ Task management<br>
                    ✓ Time planning
                </div>
            </div>
            <div class="project-header">
                <span class="project-name">Jardinage App</span>
                <span class="project-type" style="color:var(--yellow); border-color:var(--yellow)">Academique</span>
            </div>
            <p class="project-desc">
                Application de jardinage Web construite avec Flask en équipe, avec gestion des tâches et planification du temps.
            </p>
            <div class="project-tags">
                <span class="tag tag-python">Python</span>
                <span class="tag tag-flask">Flask</span>
                <span class="tag tag-html">HTML</span>
                <span class="tag tag-css">CSS</span>
            </div>
        </div>

        {{-- Project 4: HESTYBot --}}
        <div class="project-card fade-in" data-type="personal">
            <div class="project-preview preview-teal">
                <div class="preview-code">
                    HESTYBot<br><br>
                    POST /api/ask<br>
                    → "Quel est votre<br>
                    &nbsp;&nbsp; problème ?"<br>
                    Flask, JSON API, HTML/CSS
                </div>
            </div>
            <div class="project-header">
                <span class="project-name">HESTYBot</span>
                <span class="project-type type-personal">Personnel</span>
            </div>
            <p class="project-desc">
                Chatbot académique automatisant les réponses d'administration étudiante. Construit avec Python Flask, HTML/CSS et une API JSON dynamique.
            </p>
            <div class="project-tags">
                <span class="tag tag-python">Python</span>
                <span class="tag tag-flask">Flask</span>
                <span class="tag tag-js">JavaScript</span>
            </div>
        </div>

    </div>
</section>