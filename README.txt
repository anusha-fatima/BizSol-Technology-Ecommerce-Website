BizSol website - plain HTML/CSS/JS + one small PHP file (no build step)
OPEN LOCALLY: VS Code > "Live Server" > right-click index.html > Open with Live Server.
(The quote form's "Submit request" needs PHP, so locally use the WhatsApp button; on Hostinger both work.)
DEPLOY: hPanel > Websites > File Manager > public_html > upload everything (including .htaccess and enquiry.php) and extract.
Saved requests: enquiries.log in public_html (blocked from the public by .htaccess) and emailed to the address at the top of enquiry.php.
EDIT PRODUCTS / REVIEWS / PHONE: assets/app.js (CATS, REVIEWS, WA, EMAIL). Product images are drawn SVGs in ART; replace with photos later.
