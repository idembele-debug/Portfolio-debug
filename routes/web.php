<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('pages.home');
})->name('home');

Route::get('/about', function () {
    return view('pages.home', ['openOverlay' => 'about']);
})->name('about');

Route::get('/contact', function () {
    return view('pages.home', ['openOverlay' => 'contact']);
})->name('contact');

Route::get('/lang/{locale}', function (Request $request, string $locale) {
    if (! in_array($locale, ['fr', 'en'], true)) {
        $locale = config('app.locale', 'fr');
    }

    $request->session()->put('locale', $locale);

    return back();
})->name('lang.switch');

Route::get('/cv/download', function () {
    $path = public_path('pdf/ISSAD.pdf');

    abort_unless(file_exists($path), 404);

    return response()->download($path, 'ISSA_Dembele_CV.pdf');
})->name('cv.download');

Route::post('/contact', function (Request $request) {
    $validated = $request->validate([
        'name' => ['required', 'string', 'max:100'],
        'email' => ['required', 'email', 'max:255'],
        'message' => ['required', 'string', 'max:2000'],
    ]);

    unset($validated);

    return back()->with('success', 'Merci ! Votre message a bien été envoyé.');
})->name('contact.send');