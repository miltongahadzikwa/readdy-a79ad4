# Salvation in the Sanctuary — Dr. Dwight Eric Haynes Ministry Website

## 1. Project Description
A premium digital ministry platform for Dr. Dwight Eric Haynes and his church "Salvation in the Sanctuary" (SITS). The site showcases his comprehensive ministry services including sermons, devotions, theological education (HTS), research (P27), church growth systems (GSF), and subscriber-only content. Target audience: church members, theological students, potential subscribers, and the broader Christian community.

## 2. Page Structure
- `/` — Home (single-page with 6 tabbed sections)
  - `#about` — About Us
  - `#p27-blog` — P27 Blog
  - `#sanctuary-blog` — Sanctuary Blog
  - `#youtube-channel` — YouTube Channel
  - `#subscribers` — YouTube Subscribers (Login/Subscribe)
  - `#contact` — Contact Us

## 3. Core Features
- [x] Sticky navigation with 6 section tabs
- [x] Hero section with rotating photo carousel (Ken Burns effect)
- [x] Background music player (SITS Theme Song)
- [x] About Us — Dr. Haynes bio, H.I.M., HTS, GSF, P27, Project Hope
- [x] P27 Blog — Post-Doctoral Dissertation info + registration form
- [x] Sanctuary Blog — Hebrew Wilderness Tabernacle Gospel conversations
- [x] YouTube Channel — Videos, sermons, devotions, radio, books, Bible studies
- [x] Subscribers section — $10/mo subscription info + login
- [x] Contact Us — hihsits.org info + social media
- [x] Footer with social links and newsletter

## 4. Data Model Design
No database required for Phase 1. All content is static/mock data.

## 5. Backend / Third-party Integration Plan
- Supabase: Optional future phase — subscriber login/auth ($10/mo)
- Stripe: Optional future phase — subscription payments
- Shopify: Optional future phase — books/products store
- Forms: Use get_form_url for contact and registration forms

## 6. Development Phase Plan

### Phase 1: Full Homepage Build
- Goal: Build the complete single-page website with all 6 sections
- Deliverable: Fully designed, content-rich homepage with navigation, hero, all sections, and footer

### Phase 2: Subscriber Login System (Future)
- Goal: Add Supabase auth for $10/mo subscriber access
- Deliverable: Login/register flow, protected content area

### Phase 3: E-commerce / Products (Future)
- Goal: Connect Shopify for books, videos, Bible studies
- Deliverable: Products page with cart and checkout
