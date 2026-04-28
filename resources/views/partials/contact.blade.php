<div class="overlay" id="contact-overlay">
    <button class="close-btn" onclick="closeContact()">{{ __('portfolio.ui.close') }}</button>

    <div class="contact-inner">
        <div class="section-label"><span></span> CONTACT</div>
            <h2>Travaillons ensemble</h2>
            <p>
                <i>Disponible pour des stages, si vous avez un projet de stage ou voulez simplement discuter, écrivez-moi.</i>
            </p>

            <div class="contact-row">
                <span class="contact-key">email</span>
                <span class="contact-val">
                    <a href="mailto:i.dembele@hestim.ma">i.dembele@hestim.ma</a>
                </span>
            </div>
            <div class="contact-row">
                <span class="contact-key">tel</span>
                <span class="contact-val">+212-690-611-402</span>
            </div>
            <div class="contact-row">
                <span class="contact-key">linkedin</span>
                <span class="contact-val">
                    <a href="https://www.linkedin.com/in/issa-d-dembele-a46a34356/" target="_blank" rel="noopener">
                        ISSA D DEMBELE
                    </a>
                </span>
            </div>
            <div class="contact-row">
                <span class="contact-key">location</span>
                <span class="contact-val">Casablanca, Maroc</span>
            </div>

        <form
            class="contact-form"
            action="{{ route('contact.send') }}"
            method="POST"
            onsubmit="submitForm(event)"
        >
            @csrf

            <div class="form-group">
                <label for="contact-name">Name</label>
                <input
                    type="text"
                    id="contact-name"
                    name="name"
                    placeholder="Your name"
                    required
                    autocomplete="name"
                >
            </div>

            <div class="form-group">
                <label for="contact-email">Email</label>
                <input
                    type="email"
                    id="contact-email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    autocomplete="email"
                >
            </div>

            <div class="form-group">
                <label for="contact-message">Message</label>
                <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Your message or project idea..."
                    required
                ></textarea>
            </div>

            <button type="submit" class="submit-btn">Send message</button>

            @if(session('success'))
                <div style="color:var(--green); font-size:12px; margin-top:8px;">
                    ✓ {{ session('success') }}
                </div>
            @endif

            @if($errors->any())
                <div style="color:var(--red); font-size:12px; margin-top:8px;">
                    @foreach($errors->all() as $error)
                        ✗ {{ $error }}<br>
                    @endforeach
                </div>
            @endif
        </form>

    </div>
</div>