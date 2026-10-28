BizSol website - HTML/CSS/JS, plus an order-email function.

OPEN LOCALLY: VS Code > "Live Server" > right-click index.html > Open with Live Server.
(Placing an order needs a server, so locally use the "Order on WhatsApp" button.)

CART: saved in each visitor's own browser (stays after reload / closing the tab).

ORDER EMAILS (Vercel):  orders go to m.yousufakhter@gmail.com
 1. Google Account > Security > turn on 2-Step Verification > App passwords > create one (16 letters).
 2. Vercel > your project > Settings > Environment Variables, add:
      SMTP_USER = the Gmail address that will SEND the emails
      SMTP_PASS = the 16-letter app password (no spaces)
    (optional) ORDER_TO = another address to receive orders
 3. Vercel > Deployments > Redeploy.

ORDER EMAILS (Hostinger instead): upload everything incl. enquiry.php and .htaccess - the PHP file sends the email.

EDIT PRODUCTS / REVIEWS / PHONE: assets/app.js (CATS, REVIEWS, WA, EMAIL).
PRODUCT PHOTOS: assets/img/ - then list the file in CIMG (per category) or PIMG (per product) in assets/app.js.
