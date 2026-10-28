/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Mail,
  Lock,
  LogOut,
  CheckCircle2,
  Menu,
  X,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
  Package,
  Truck,
  Handshake,
  Plus,
  RotateCcw,
  Pencil,
  Trash2,
  Eye,
  Target,
  Building2,
  Sparkles,
  Layers,
  ChevronLeft,
  ChevronRight,
  Images
} from 'lucide-react';

// --- DATA STRUCTURES & TYPES ---

export type Language = 'id' | 'en';

export interface Product {
  id: string;
  name: string;
  category: string;
  grade: string;
  moisture: string;
  packaging: string;
  desc: string;
  image: string;
  images?: string[];
}

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Cengkeh Lalpari (Dried Cloves)',
    category: 'Cengkeh',
    grade: 'Grade A / Lalpari',
    moisture: 'Max 12%',
    packaging: '25 Kg / 50 Kg PP Bags / Jute Bags',
    desc: 'Cengkeh sortasi pilihan dengan warna cokelat kemerahan cerah, headless sprout rendah (<1%), dan aroma minyak atsiri yang kuat.',
    image: '/src/assets/images/regenerated_image_1792989446523.jpg',
    images: [
      '/src/assets/images/regenerated_image_1792989446523.jpg',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'prod-2',
    name: 'Kayu Manis Kerinci (Cassia Vera)',
    category: 'Kayu Manis',
    grade: 'Stick Vera AA (8-10 cm)',
    moisture: 'Max 13.5%',
    packaging: 'Carton Box 10 Kg / Bundle 25 Kg',
    desc: 'Berasal dari lereng Gunung Kerinci Sumatera. Batang bersih tanpa lumut, gulungan rapi, dan kadar volatile oil tinggi.',
    image: '/src/assets/images/regenerated_image_1792989454460.jpg',
    images: [
      '/src/assets/images/regenerated_image_1792989454460.jpg',
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'prod-3',
    name: 'Biji Pala Bulat (Whole Nutmeg ABCD)',
    category: 'Pala',
    grade: 'Grade ABCD / Sound Quality',
    moisture: 'Max 10%',
    packaging: '50 Kg Gunny Jute Bag',
    desc: 'Biji pala utuh asal Maluku dan Sulawesi. Bebas jamur/aflatoksin, keriput minimal, dan wangi aromatik khas rempah Banda.',
    image: '/src/assets/images/regenerated_image_1792989462153.jpg',
    images: [
      '/src/assets/images/regenerated_image_1792989462153.jpg',
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'prod-4',
    name: 'Lada Hitam Lampung (Black Pepper)',
    category: 'Lada',
    grade: 'Density 550 - 580 G/L (FAQ & ASTA)',
    moisture: 'Max 12.5%',
    packaging: '25 Kg / 50 Kg Multi-wall Paper Bag',
    desc: 'Dipanen dari perkebunan Lampung, butiran padat dengan kepedasan tajam (piperin tinggi), serta kadar foreign matter minim.',
    image: '/src/assets/images/regenerated_image_1792989469921.jpg',
    images: [
      '/src/assets/images/regenerated_image_1792989469921.jpg',
      'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'prod-5',
    name: 'Jahe Gajah Kering (Dried Split Ginger)',
    category: 'Jahe',
    grade: 'Export Grade Sun-Dried',
    moisture: 'Max 11%',
    packaging: '25 Kg PP Woven Bags',
    desc: 'Jahe kupas belah kering matahari berkualitas tinggi. Dijemur alami di atas anyaman bambu tradisional, tanpa bahan kimia atau pewarna buatan, warna krem natural, dan kadar shogaol/gingerol terjaga.',
    image: '/src/assets/images/ginger_sun_drying_1792986527329.jpg',
    images: [
      '/src/assets/images/ginger_sun_drying_1792986527329.jpg',
      'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop'
    ]
  }
];

const ADMIN_CREDENTIALS = {
  username: 'domestiq123',
  email: 'fakhrariefal@domestiqhub.com',
  password: 'domestiq123'
};

// --- MULTI-LANGUAGE TRANSLATION DICTIONARY ---

const I18N = {
  id: {
    top_location: 'Bekasi, Jawa Barat 17535',
    top_login_admin: 'Login Admin',
    top_admin_active: 'Sesi Admin Aktif',
    brand_subtitle: 'Trading & Procurement',
    nav_home: 'Beranda',
    nav_about: 'Tentang Kami',
    nav_legalitas: 'Data Legalitas',
    nav_products: 'Katalog Produk',
    nav_services: 'Layanan & Undername',
    nav_contact: 'Kontak',
    nav_wa_btn: 'Hubungi WhatsApp',
    admin_banner_text: 'Mode Administrator Terverifikasi: Anda memiliki hak akses Tambah, Edit, dan Hapus Katalog.',
    hero_tag: 'Your Trusted Partner in Supply Chain Solutions',
    hero_headline_1: 'PT DomestiQ Hub',
    hero_headline_2: 'Indonesia',
    hero_description:
      'Perusahaan perdagangan terpercaya yang bergerak di bidang pengadaan barang, distribusi, serta solusi rantai pasok terintegrasi—termasuk suplai rempah ekspor dan fasilitas Undername Export bagi pelaku usaha Indonesia.',
    hero_btn_catalog: 'Minta Katalog Rempah',
    hero_btn_legal: 'Kelengkapan Legalitas',
    hero_stat_1_num: 'KBLI 46901/02',
    hero_stat_1_txt: 'Perdagangan Besar',
    hero_stat_2_num: '100% Legal',
    hero_stat_2_txt: 'SK Kemenkumham RI',
    hero_stat_3_num: 'End-to-End',
    hero_stat_3_txt: 'Supply Chain & Ekspor',
    hero_card_tag: 'Trading & Procurement',
    hero_card_title: 'Penghubung Efektif Pemasok & Pasar',
    hero_card_sub: 'Penyedia solusi rantai pasok yang andal, efisien, dan tepat waktu.',
    about_tag: 'Tentang Kami',
    about_title: 'Mitra Strategis bagi Pelaku Usaha dalam Solusi Rantai Pasok Modern',
    about_p1:
      'PT DomestiQ Hub Indonesia adalah perusahaan perdagangan berbadan hukum Perseroan Perorangan yang bergerak di bidang pengadaan barang dan distribusi. Kami hadir sebagai mitra strategis bagi pelaku usaha yang membutuhkan solusi supply chain yang andal, efisien, dan tepat waktu.',
    about_p2:
      'Dengan fokus pada pengelolaan rantai pasok yang transparan dan profesional, DomestiQ Hub berkomitmen menjadi penghubung yang efektif antara pemasok dan pasar, serta memfasilitasi legalitas ekspor komoditas lokal menuju kancah internasional.',
    about_leader_name: 'Fakhra Riefal Muhtadin',
    about_leader_title: 'Direktur Utama & Pemilik Tunggal',
    about_leader_note:
      'Sebagai Perseroan Perorangan, seluruh fungsi manajerial (Operasional, Keuangan, Pengadaan, dan Pemasaran) dijalankan secara terpusat untuk menjamin koordinasi yang tangkas dan pengambilan keputusan yang cepat.',
    vision_title: 'Visi Perusahaan',
    vision_desc:
      '"Menjadi perusahaan trading yang terpercaya dan adaptif dalam membangun ekosistem rantai pasok yang kuat, efisien, serta berkelanjutan di Indonesia."',
    mission_title: 'Misi Perusahaan',
    mission_1: 'Menyediakan layanan pengadaan dan distribusi barang yang cepat, efisien, dan tepat waktu.',
    mission_2: 'Membangun jaringan kemitraan yang luas dan saling menguntungkan dengan pemasok maupun pelanggan.',
    mission_3: 'Menjaga profesionalisme, transparansi, dan kepatuhan legalitas dalam setiap operasional bisnis.',
    mission_4: 'Menghadirkan solusi supply chain yang fleksibel sesuai kebutuhan pelaku usaha.',
    legal_tag: 'Kepatuhan Hukum & Akuntabilitas',
    legal_title: 'Data Resmi Legalitas Perusahaan',
    legal_desc:
      'PT DomestiQ Hub Indonesia beroperasi di bawah payung hukum Republik Indonesia yang sah dan terdaftar resmi di Kementerian Hukum dan HAM.',
    table_company_name: 'Nama Perusahaan',
    table_entity_type: 'Bentuk Badan Hukum',
    table_entity_val: 'Perseroan Perorangan (Usaha Mikro)',
    table_ahu_number: 'Nomor Keputusan Kemenkumham',
    table_est_date: 'Tanggal Pendirian',
    table_est_val: '25 September 2026',
    table_kbli: 'KBLI',
    table_kbli_val: 'Perdagangan Besar',
    table_kpp: 'Kantor Pajak (KPP)',
    table_director: 'Direktur Utama',
    table_address: 'Alamat Resmi Kantor',
    table_email: 'Email Resmi',
    table_contact: 'Kontak Resmi Perusahaan',
    scope_tag: 'Ruang Lingkup Usaha',
    scope_title: 'Solusi Terintegrasi Pengadaan, Distribusi & Ekspor',
    scope_desc:
      'Kami melayani kebutuhan supply chain mulai dari level pengadaan domestik hingga perizinan legalitas ekspor ke pasar global.',
    scope_item1_title: 'Pengadaan Barang',
    scope_item1_desc:
      'Pengelolaan proses procurement dari identifikasi kebutuhan, pencarian pemasok berkualitas, negosiasi harga, hingga pemesanan barang secara terstruktur.',
    scope_item2_title: 'Distribusi & Supply Chain',
    scope_item2_desc:
      'Pengelolaan jalur distribusi barang dari pemasok hingga jaringan pelanggan dengan sistem logistik yang efisien, transparan, dan terukur.',
    scope_item3_title: 'Solusi Kemitraan & Undername',
    scope_item3_desc:
      'Terbuka untuk skema suplai rutin, pengadaan khusus industri, serta fasilitas Sewa Legalitas Undername Ekspor bagi UMKM untuk pengiriman ke mancanegara.',
    cat_tag: 'Katalog Perdagangan Komoditas',
    cat_title: 'Rempah Nusantara Kualitas Ekspor',
    cat_desc:
      'Komoditas pilihan siap kirim untuk pasar domestik maupun mancanegara dengan standar sortasi ketat dan kadar air terkontrol.',
    admin_btn_add: 'Tambah Produk Baru',
    admin_btn_reset: 'Reset Demo Data',
    cat_all: 'Semua Produk',
    adv_tag: 'Nilai Tambah Kami',
    adv_title: 'Keunggulan Kompetitif DomestiQ Hub',
    adv_item1_title: 'Legalitas Lengkap',
    adv_item1_desc:
      'Beroperasi di bawah naungan badan hukum yang sah, dilengkapi NIB, NPWP, dan kelengkapan administrasi perpajakan yang tertib.',
    adv_item2_title: 'Proses Terstruktur',
    adv_item2_desc:
      'Sistem pencatatan dan pengelolaan pengadaan yang rapi untuk memastikan akuntabilitas dan efisiensi operasional.',
    adv_item3_title: 'Fleksibilitas Kerja Sama',
    adv_item3_desc:
      'Terbuka untuk berbagai skema kolaborasi dan negosiasi volume sesuai skala dan kebutuhan mitra bisnis Anda.',
    adv_item4_title: 'Responsif & Andal',
    adv_item4_desc:
      'Komitmen penuh pada kecepatan layanan dan ketepatan waktu dalam setiap proses pengadaan dan distribusi.',
    contact_tag: 'Hubungi Kami',
    contact_title: 'Konsultasikan Kebutuhan Pengadaan & Ekspor Anda',
    contact_desc:
      'Silakan hubungi kami untuk mendiskusikan pengadaan rutin, penawaran harga komoditas rempah, atau asistensi legalitas ekspor.',
    contact_office_title: 'Alamat Kantor:',
    contact_phone_title: 'WhatsApp & Telepon Resmi:',
    contact_email_title: 'Email Resmi:',
    rfq_form_title: 'Kirim Permintaan Penawaran (RFQ)',
    rfq_name_label: 'Nama Lengkap / Perusahaan *',
    rfq_phone_label: 'Nomor WhatsApp *',
    rfq_service_label: 'Kebutuhan Pengadaan / Layanan',
    rfq_desc_label: 'Rincian Kebutuhan & Spesifikasi',
    rfq_desc_placeholder: 'Sebutkan jenis barang, volume perkiraan (kg/ton), serta tujuan pengiriman...',
    rfq_submit_btn: 'Kirim Langsung via WhatsApp Resmi',
    modal_login_title: 'Otentikasi Administrator',
    modal_login_sub: 'Masuk untuk mengelola katalog produk PT DomestiQ Hub Indonesia',
    modal_login_err: 'Username atau password salah!',
    modal_login_user: 'Username / Email Admin',
    modal_login_hint_title: 'Kredensial Admin:',
    btn_cancel: 'Batal',
    btn_save: 'Simpan Perubahan',
    btn_login_submit: 'Masuk Sekarang',
    btn_inquiry_card: 'Tanya Spesifikasi & Harga',
    label_moisture: 'Kadar Air:',
    label_packing: 'Packing:',
    footer_rights: '© 2026 PT DomestiQ Hub Indonesia. All Rights Reserved.',
    logout_confirm: 'Apakah Anda yakin ingin keluar dari Mode Administrator?',
    delete_confirm_title: 'Hapus Produk',
    delete_confirm_desc: 'Apakah Anda yakin ingin menghapus produk ini dari katalog?',
    reset_confirm_title: 'Reset Katalog',
    reset_confirm_desc: 'Kembalikan data katalog ke 5 komoditas bawaan pabrik?',
    toast_added: 'Produk berhasil ditambahkan!',
    toast_updated: 'Produk berhasil diperbarui!',
    toast_deleted: 'Produk berhasil dihapus.',
    toast_reset: 'Data katalog berhasil direset.'
  },
  en: {
    top_location: 'Bekasi, West Java 17535, Indonesia',
    top_login_admin: 'Admin Login',
    top_admin_active: 'Admin Session Active',
    brand_subtitle: 'Trading & Procurement',
    nav_home: 'Home',
    nav_about: 'About Us',
    nav_legalitas: 'Corporate Legality',
    nav_products: 'Spices Catalog',
    nav_services: 'Services & Undername',
    nav_contact: 'Contact',
    nav_wa_btn: 'Contact WhatsApp',
    admin_banner_text: 'Verified Administrator Mode: You have full access to Add, Edit, and Delete catalog products.',
    hero_tag: 'Your Trusted Partner in Supply Chain Solutions',
    hero_headline_1: 'PT DomestiQ Hub',
    hero_headline_2: 'Indonesia',
    hero_description:
      'A legally certified trading enterprise in Indonesia specializing in procurement, distribution, and integrated supply chain management—including export-grade spices supply and comprehensive Undername Export facilitation.',
    hero_btn_catalog: 'Request Spices Catalog',
    hero_btn_legal: 'Corporate Legality',
    hero_stat_1_num: 'KBLI 46901/02',
    hero_stat_1_txt: 'Wholesale Trading',
    hero_stat_2_num: '100% Legal',
    hero_stat_2_txt: 'Ministry of Law Verified',
    hero_stat_3_num: 'End-to-End',
    hero_stat_3_txt: 'Supply Chain & Export',
    hero_card_tag: 'Trading & Procurement',
    hero_card_title: 'Effective Bridge Between Suppliers & Markets',
    hero_card_sub: 'Delivering reliable, efficient, and punctual supply chain solutions.',
    about_tag: 'About Us',
    about_title: 'Strategic Partner for Businesses in Modern Supply Chain Solutions',
    about_p1:
      'PT DomestiQ Hub Indonesia is an incorporated trading enterprise registered as a Sole Proprietorship Company, focused on goods procurement and distribution. We act as a strategic partner for businesses needing dependable, cost-effective, and on-time supply chain operations.',
    about_p2:
      'With strict dedication to transparent and professional supply chain management, DomestiQ Hub is committed to connecting producers with domestic and global markets, while assisting local producers with official export compliance.',
    about_leader_name: 'Fakhra Riefal Muhtadin',
    about_leader_title: 'President Director & Sole Owner',
    about_leader_note:
      'As a Sole Proprietorship Company, managerial operations (Operations, Finance, Procurement, and Marketing) are centralized to ensure agility and swift corporate decision-making.',
    vision_title: 'Company Vision',
    vision_desc:
      '"To become a trusted and adaptive trading corporation in establishing a robust, efficient, and sustainable supply chain ecosystem across Indonesia."',
    mission_title: 'Company Mission',
    mission_1: 'Provide swift, efficient, and punctual procurement and distribution services.',
    mission_2: 'Build expansive, mutually beneficial partnership networks with suppliers and clients.',
    mission_3: 'Uphold highest professionalism, transparency, and strict statutory compliance in all business operations.',
    mission_4: 'Deliver flexible supply chain frameworks tailored to diverse enterprise requirements.',
    legal_tag: 'Regulatory Compliance & Accountability',
    legal_title: 'Official Corporate Legal Records',
    legal_desc:
      'PT DomestiQ Hub Indonesia operates legitimately under the laws of the Republic of Indonesia with official registration at the Ministry of Law and Human Rights.',
    table_company_name: 'Company Name',
    table_entity_type: 'Legal Entity Type',
    table_entity_val: 'Sole Proprietorship Company (Micro-Enterprise)',
    table_ahu_number: 'Ministerial Decree (AHU)',
    table_est_date: 'Date of Incorporation',
    table_est_val: 'September 25, 2026',
    table_kbli: 'KBLI Industry Code',
    table_kbli_val: 'Wholesale Trading',
    table_kpp: 'Tax Office (KPP)',
    table_director: 'President Director',
    table_address: 'Registered Office Address',
    table_email: 'Official Email',
    table_contact: 'Official Business Phone',
    scope_tag: 'Business Scope',
    scope_title: 'Integrated Solutions in Procurement, Distribution & Export',
    scope_desc:
      'We serve comprehensive supply chain requirements from local bulk purchasing to overseas export clearance.',
    scope_item1_title: 'Goods Procurement',
    scope_item1_desc:
      'End-to-end procurement process management: requirement assessment, supplier identification, commercial negotiation, and order placement.',
    scope_item2_title: 'Distribution & Supply Chain',
    scope_item2_desc:
      'Managing streamlined freight channels from suppliers to customer networks with measurable logistics efficiency.',
    scope_item3_title: 'Partnership & Undername Export',
    scope_item3_desc:
      'Open for long-term contractual supply, custom procurement, and Undername Export services for Indonesian producers to enter global markets.',
    cat_tag: 'Commodity Trading Catalog',
    cat_title: 'Indonesian Export-Grade Spices',
    cat_desc:
      'Premium commodities ready for shipment worldwide with strict sorting standards and moisture control.',
    admin_btn_add: 'Add New Product',
    admin_btn_reset: 'Reset Demo Data',
    cat_all: 'All Commodities',
    adv_tag: 'Our Value Proposition',
    adv_title: 'Competitive Advantages of DomestiQ Hub',
    adv_item1_title: 'Full Statutory Compliance',
    adv_item1_desc:
      'Fully registered with valid NIB, Tax ID (NPWP), and clean tax administration under Indonesian commercial law.',
    adv_item2_title: 'Structured Operations',
    adv_item2_desc:
      'Organized inventory auditing and procurement bookkeeping to ensure transparent governance and operational efficiency.',
    adv_item3_title: 'Flexible Collaboration',
    adv_item3_desc:
      'Accommodating various commercial engagement terms, MOQ flexibility, and custom client specifications.',
    adv_item4_title: 'Responsive & Dependable',
    adv_item4_desc:
      'Committed to prompt communication and punctuality across procurement, storage, and fulfillment cycles.',
    contact_tag: 'Contact Us',
    contact_title: 'Consult Your Procurement & Export Needs',
    contact_desc:
      'Get in touch with our commercial desk to discuss scheduled sourcing, spice quotes, or export undername assistance.',
    contact_office_title: 'Office Address:',
    contact_phone_title: 'Official WhatsApp & Phone:',
    contact_email_title: 'Official Email:',
    rfq_form_title: 'Request for Quotation (RFQ)',
    rfq_name_label: 'Full Name / Company *',
    rfq_phone_label: 'WhatsApp Number *',
    rfq_service_label: 'Required Sourcing / Service',
    rfq_desc_label: 'Specification & Requirement Details',
    rfq_desc_placeholder: 'Specify product type, estimated quantity (kg/tons), destination port...',
    rfq_submit_btn: 'Send Inquiry via Official WhatsApp',
    modal_login_title: 'Administrator Authentication',
    modal_login_sub: "Sign in to manage PT DomestiQ Hub Indonesia's product catalog",
    modal_login_err: 'Invalid username or password!',
    modal_login_user: 'Admin Username / Email',
    modal_login_hint_title: 'Admin Credentials:',
    btn_cancel: 'Cancel',
    btn_save: 'Save Changes',
    btn_login_submit: 'Sign In',
    btn_inquiry_card: 'Inquire Specs & FOB/CIF',
    label_moisture: 'Moisture:',
    label_packing: 'Packaging:',
    footer_rights: '© 2026 PT DomestiQ Hub Indonesia. All Rights Reserved.',
    logout_confirm: 'Are you sure you want to log out from Administrator Mode?',
    delete_confirm_title: 'Delete Product',
    delete_confirm_desc: 'Are you sure you want to remove this commodity from the catalog?',
    reset_confirm_title: 'Reset Catalog',
    reset_confirm_desc: 'Restore catalog to the 5 default Indonesian export commodities?',
    toast_added: 'Commodity added successfully!',
    toast_updated: 'Commodity updated successfully!',
    toast_deleted: 'Commodity deleted.',
    toast_reset: 'Catalog data reset to default.'
  }
};

// WhatsApp Icon SVG component
function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.031 2C6.5 2 2 6.49 2 12.012c0 1.76.46 3.48 1.33 5l-1.42 5.19 5.32-1.39a9.99 9.99 0 0 0 4.8 1.22h.004c5.53 0 10.02-4.49 10.02-10.012A9.99 9.99 0 0 0 12.031 2zm0 18.27h-.003a8.3 8.3 0 0 1-4.22-1.16l-.3-.18-3.14.82.84-3.05-.2-.31a8.27 8.27 0 0 1-1.27-4.38c0-4.58 3.73-8.31 8.32-8.31a8.27 8.27 0 0 1 5.88 2.43 8.26 8.26 0 0 1 2.44 5.88c0 4.58-3.73 8.31-8.32 8.31zm4.56-6.22c-.25-.13-1.48-.73-1.71-.81-.23-.09-.4-.13-.57.13-.17.25-.66.81-.81.98-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.4-1.74-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.57-1.37-.78-1.88-.2-.49-.41-.43-.57-.44-.15-.01-.32-.01-.49-.01s-.44.06-.67.32c-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.48-.61 1.69-1.19.21-.59.21-1.09.15-1.19-.06-.1-.23-.17-.48-.29z" />
    </svg>
  );
}

// --- PRODUCT CARD WITH PHOTO GALLERY CAROUSEL ---

interface ProductCardProps {
  product: Product;
  isAdmin: boolean;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
  t: Record<string, string>;
}

function ProductCard({ product, isAdmin, onEdit, onDelete, t }: ProductCardProps) {
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Keep index within bounds if images change dynamically
  const safeIndex = activeImgIndex < images.length ? activeImgIndex : 0;
  const currentImage = images[safeIndex] || product.image;

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col relative group">
      {/* Carousel Image Container */}
      <div className="relative h-60 overflow-hidden bg-stone-100 select-none">
        <img
          key={currentImage}
          src={currentImage}
          alt={`${product.name} - slide ${safeIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              product.id === 'prod-5'
                ? '/src/assets/images/ginger_sun_drying_1792986527329.jpg'
                : 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop';
          }}
          loading="lazy"
        />

        {/* Carousel Navigation Buttons (Lucide Chevron Left & Right) */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-sm transition flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 z-20 shadow-lg cursor-pointer"
              aria-label="Previous image"
              title="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/85 text-white backdrop-blur-sm transition flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 z-20 shadow-lg cursor-pointer"
              aria-label="Next image"
              title="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 bg-[#1C1512]/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded z-10 pointer-events-none">
          {product.grade}
        </div>
        <div className="absolute top-3 right-3 bg-[#B84720] text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded shadow z-10 pointer-events-none">
          {product.category}
        </div>

        {/* Bottom Carousel Controls: Indicator Dots & Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
            {/* Interactive Dots */}
            <div className="flex items-center gap-1.5 bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-full pointer-events-auto shadow-sm">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveImgIndex(idx);
                  }}
                  className={`transition-all rounded-full cursor-pointer ${
                    safeIndex === idx
                      ? 'w-4 h-1.5 bg-[#D95C32]'
                      : 'w-1.5 h-1.5 bg-white/70 hover:bg-white'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Counter Badge with Lucide Images icon */}
            <div className="bg-black/60 backdrop-blur-md text-white text-[10px] font-mono px-2 py-0.5 rounded flex items-center gap-1 pointer-events-auto shadow">
              <Images className="w-3 h-3 text-stone-300" />
              <span>
                {safeIndex + 1}/{images.length}
              </span>
            </div>
          </div>
        )}

        {/* Admin Actions Overlay */}
        {isAdmin && (
          <div className="absolute inset-0 bg-black/65 flex items-center justify-center gap-2 p-4 transition opacity-0 group-hover:opacity-100 z-30">
            <button
              type="button"
              onClick={() => onEdit(product)}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              type="button"
              onClick={() => onDelete(product)}
              className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold transition flex items-center gap-1 shadow cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Hapus</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-[#2E1F18] font-serif mb-2">
          {product.name}
        </h3>
        <p className="text-xs text-[#52453F] leading-relaxed line-clamp-3 mb-4">
          {product.desc}
        </p>

        <div className="mt-auto space-y-2 border-t border-stone-100 pt-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-stone-400 font-medium">{t.label_moisture}</span>
            <span className="font-bold text-[#2E1F18] font-mono">
              {product.moisture || 'Standard'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-stone-400 font-medium">{t.label_packing}</span>
            <span className="font-bold text-[#2E1F18] text-right">
              {product.packaging || 'By Request'}
            </span>
          </div>
        </div>

        <div className="pt-5 mt-4 border-t border-stone-100">
          <a
            href={`https://wa.me/6285706375004?text=Halo%20PT%20DomestiQ%20Hub%20Indonesia,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(
              product.name
            )}%20grade%20${encodeURIComponent(product.grade)}.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#B84720] text-[#B84720] hover:bg-[#B84720] hover:text-white transition font-semibold text-xs"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>{t.btn_inquiry_card}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  // 1. Language state with persistent localStorage
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('domestiq_lang');
      if (saved === 'en' || saved === 'id') return saved;
    }
    return 'id';
  });

  const t = I18N[lang];

  // 2. Admin Authentication State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('domestiq_admin_session') === 'true';
    }
    return false;
  });

  // 3. Products state with localStorage persistence
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('domestiq_catalog_data');
      if (stored) {
        try {
          const parsed: Product[] = JSON.parse(stored);
          return parsed.map((p) => {
            const defaultMatch = DEFAULT_PRODUCTS.find((d) => d.id === p.id);
            if (defaultMatch) {
              return {
                ...p,
                image: defaultMatch.image,
                images: defaultMatch.images,
                desc: p.id === 'prod-5' ? defaultMatch.desc : p.desc
              };
            }
            return {
              ...p,
              images: p.images && p.images.length > 0 ? p.images : [p.image]
            };
          });
        } catch (e) {
          console.error('Failed to parse catalog data', e);
        }
      }
    }
    return DEFAULT_PRODUCTS;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals state
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productModalMode, setProductModalMode] = useState<'add' | 'edit'>('add');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Custom confirmation dialogs (prevents window.confirm iframe lockups)
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({
    open: false,
    title: '',
    description: '',
    onConfirm: () => {}
  });

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // RFQ form state
  const [rfqName, setRfqName] = useState('');
  const [rfqPhone, setRfqPhone] = useState('');
  const [rfqService, setRfqService] = useState('Pengadaan Rempah Kering (Ekspor/Lokal)');
  const [rfqDesc, setRfqDesc] = useState('');

  // Save products to localStorage on update
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('domestiq_catalog_data', JSON.stringify(products));
    }
  }, [products]);

  // Sync language selection
  const handleSetLanguage = (newLang: Language) => {
    setLang(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('domestiq_lang', newLang);
      document.documentElement.lang = newLang;
    }
  };

  // Admin login handler
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = loginUsername.trim();
    const pass = loginPassword.trim();

    const userLower = user.toLowerCase();
    const isUserValid =
      userLower === 'domestiq123' ||
      userLower === 'admin' ||
      userLower === ADMIN_CREDENTIALS.email.toLowerCase();
    const isPassValid = pass === 'domestiq123';

    if (isUserValid && isPassValid) {
      setIsAdmin(true);
      sessionStorage.setItem('domestiq_admin_session', 'true');
      setLoginModalOpen(false);
      setLoginError(false);
      setLoginUsername('');
      setLoginPassword('');
      showToast(lang === 'en' ? 'Administrator logged in successfully.' : 'Berhasil login sebagai Administrator.');
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setConfirmDialog({
      open: true,
      title: lang === 'en' ? 'Log Out' : 'Keluar Sesi',
      description: t.logout_confirm,
      onConfirm: () => {
        setIsAdmin(false);
        sessionStorage.removeItem('domestiq_admin_session');
        setConfirmDialog((prev) => ({ ...prev, open: false }));
        showToast(lang === 'en' ? 'Admin logged out.' : 'Sesi admin telah diakhiri.');
      }
    });
  };

  // CRUD actions for products
  const openAddProductModal = () => {
    setProductModalMode('add');
    setEditingProduct({
      id: '',
      name: '',
      category: 'Cengkeh',
      grade: '',
      moisture: '',
      packaging: '',
      desc: '',
      image: '',
      images: []
    });
    setProductModalOpen(true);
  };

  const openEditProductModal = (product: Product) => {
    setProductModalMode('edit');
    setEditingProduct({
      ...product,
      images:
        product.images && product.images.length > 0
          ? [...product.images]
          : [product.image]
    });
    setProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const primaryImg =
      editingProduct.image.trim() ||
      'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=800&auto=format&fit=crop';
    const rawGallery = (editingProduct.images || [])
      .map((s) => s.trim())
      .filter(Boolean);
    const combinedImages = Array.from(new Set([primaryImg, ...rawGallery]));

    if (productModalMode === 'add') {
      const newProduct: Product = {
        ...editingProduct,
        id: 'prod-' + Date.now(),
        image: primaryImg,
        images: combinedImages
      };
      setProducts([newProduct, ...products]);
      showToast(t.toast_added);
    } else {
      setProducts(
        products.map((p) =>
          p.id === editingProduct.id
            ? { ...editingProduct, image: primaryImg, images: combinedImages }
            : p
        )
      );
      showToast(t.toast_updated);
    }

    setProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (product: Product) => {
    setConfirmDialog({
      open: true,
      title: t.delete_confirm_title,
      description: `${t.delete_confirm_desc} ("${product.name}")`,
      onConfirm: () => {
        setProducts(products.filter((p) => p.id !== product.id));
        setConfirmDialog((prev) => ({ ...prev, open: false }));
        showToast(t.toast_deleted);
      }
    });
  };

  const handleResetDemoData = () => {
    setConfirmDialog({
      open: true,
      title: t.reset_confirm_title,
      description: t.reset_confirm_desc,
      onConfirm: () => {
        setProducts(DEFAULT_PRODUCTS);
        setConfirmDialog((prev) => ({ ...prev, open: false }));
        showToast(t.toast_reset);
      }
    });
  };

  // RFQ form submission via WhatsApp
  const handleRfqSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Halo PT DomestiQ Hub Indonesia,%0A%0ASaya ingin mengajukan permohonan penawaran / konsultasi resmi:%0A- *Nama / Perusahaan:* ${encodeURIComponent(
      rfqName
    )}%0A- *WhatsApp:* ${encodeURIComponent(rfqPhone)}%0A- *Layanan / Kebutuhan:* ${encodeURIComponent(
      rfqService
    )}%0A- *Rincian:* ${encodeURIComponent(
      rfqDesc
    )}%0A%0AMohon informasi lebih lanjut. Terima kasih.%0A(Email Kontak: fakhrariefal@domestiqhub.com)`;

    const waUrl = `https://wa.me/6285706375004?text=${message}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // Filtered products
  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
        );

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2E1F18] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1C1512] text-white px-5 py-3 rounded-xl shadow-2xl border border-stone-700 flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Info & Language Switcher & Admin Auth */}
      <div className="bg-[#1C1512] text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          {/* Contact Details */}
          <div className="flex items-center gap-4 flex-wrap text-stone-300">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D95C32]" />
              <span>{t.top_location}</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-400" />
              <a
                href="https://wa.me/6285706375004"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition font-mono"
              >
                +62 857-0637-5004
              </a>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#D95C32]" />
              <a
                href="mailto:fakhrariefal@domestiqhub.com"
                className="hover:text-white transition font-mono"
              >
                fakhrariefal@domestiqhub.com
              </a>
            </span>
          </div>

          {/* Right Tools: Language Switcher & Admin Button */}
          <div className="flex items-center gap-3">
            {/* Multi-Language Switcher (ID / EN) */}
            <div className="inline-flex rounded-lg bg-stone-800 p-0.5 border border-stone-700 text-[11px] font-semibold">
              <button
                type="button"
                onClick={() => handleSetLanguage('id')}
                className={`px-2.5 py-1 rounded transition ${
                  lang === 'id'
                    ? 'bg-[#B84720] text-white shadow'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                ID
              </button>
              <button
                type="button"
                onClick={() => handleSetLanguage('en')}
                className={`px-2.5 py-1 rounded transition ${
                  lang === 'en'
                    ? 'bg-[#B84720] text-white shadow'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            {/* Admin Auth Area */}
            {!isAdmin ? (
              <button
                type="button"
                onClick={() => {
                  setLoginUsername('');
                  setLoginPassword('');
                  setLoginError(false);
                  setLoginModalOpen(true);
                }}
                className="px-2.5 py-1 rounded bg-stone-800 hover:bg-[#B84720] text-stone-200 hover:text-white font-medium transition flex items-center gap-1.5 border border-stone-700 text-[11px]"
              >
                <Lock className="w-3 h-3" />
                <span>{t.top_login_admin}</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{t.top_admin_active}</span>
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-2.5 py-1 rounded bg-red-950/80 hover:bg-red-800 text-red-200 hover:text-white text-[11px] font-medium transition border border-red-800/60 flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 custom-glass border-b border-stone-200 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <a href="#home" className="flex items-center gap-3">
              <div className="w-11 h-11 bg-[#B84720] text-white flex items-center justify-center rounded-lg shadow-md font-serif text-2xl font-bold tracking-tight">
                D
              </div>
              <div>
                <div className="text-xl font-bold tracking-tight text-[#2E1F18] leading-none">
                  DOMESTIQ HUB
                </div>
                <span className="text-[10px] tracking-widest text-[#B84720] font-semibold uppercase">
                  {t.brand_subtitle}
                </span>
              </div>
            </a>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#52453F]">
              <a href="#home" className="hover:text-[#B84720] transition">
                {t.nav_home}
              </a>
              <a href="#about" className="hover:text-[#B84720] transition">
                {t.nav_about}
              </a>
              <a href="#legalitas" className="hover:text-[#B84720] transition">
                {t.nav_legalitas}
              </a>
              <a
                href="https://wa.me/6285706375004?text=Halo%20PT%20DomestiQ%20Hub%20Indonesia,%20saya%20ingin%20meminta%20katalog%20rempah%20(Spices%20Catalog)%20resmi."
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#B84720] transition"
              >
                {t.nav_products}
              </a>
              <a href="#layanan" className="hover:text-[#B84720] transition">
                {t.nav_services}
              </a>
              <a href="#contact" className="hover:text-[#B84720] transition">
                {t.nav_contact}
              </a>
            </nav>

            {/* WhatsApp CTA Button */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://wa.me/6285706375004?text=Halo%20PT%20DomestiQ%20Hub%20Indonesia,%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20pengadaan%20dan%20ekspor."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-lg bg-[#B84720] hover:bg-[#943515] text-white text-sm font-semibold transition shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4" />
                <span>{t.nav_wa_btn}</span>
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-[#2E1F18] p-2 rounded-lg hover:bg-stone-100 transition focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-4 space-y-3">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#2E1F18] font-medium"
            >
              {t.nav_home}
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#2E1F18] font-medium"
            >
              {t.nav_about}
            </a>
            <a
              href="#legalitas"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#2E1F18] font-medium"
            >
              {t.nav_legalitas}
            </a>
            <a
              href="https://wa.me/6285706375004?text=Halo%20PT%20DomestiQ%20Hub%20Indonesia,%20saya%20ingin%20meminta%20katalog%20rempah%20(Spices%20Catalog)%20resmi."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#B84720] font-medium"
            >
              {t.nav_products}
            </a>
            <a
              href="#layanan"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#2E1F18] font-medium"
            >
              {t.nav_services}
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-[#2E1F18] font-medium"
            >
              {t.nav_contact}
            </a>
            <a
              href="https://wa.me/6285706375004"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-emerald-700 font-bold flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp: +62 857-0637-5004</span>
            </a>
          </div>
        )}
      </header>

      {/* Admin Notification Banner */}
      {isAdmin && (
        <div className="bg-emerald-900 text-emerald-100 text-xs py-2.5 px-4 text-center font-medium tracking-wide border-b border-emerald-800 sticky top-20 z-30 shadow-md flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{t.admin_banner_text}</span>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-[#1C1512] text-stone-100 overflow-hidden py-20 lg:py-28"
      >
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d95c32_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800 text-[#D95C32] text-xs font-semibold uppercase tracking-wider border border-stone-700">
                <Handshake className="w-3.5 h-3.5" />
                <span>{t.hero_tag}</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
                {t.hero_headline_1} <span className="text-[#D95C32]">{t.hero_headline_2}</span>
              </h1>
              <p className="text-stone-300 text-lg leading-relaxed max-w-2xl font-light">
                {t.hero_description}
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={`https://wa.me/6285706375004?text=${encodeURIComponent(
                    lang === 'en'
                      ? 'Halo PT DomestiQ Hub Indonesia, saya ingin meminta katalog resmi komoditas rempah (Spices Catalog).'
                      : 'Halo PT DomestiQ Hub Indonesia, saya ingin meminta katalog resmi komoditas rempah (Spices Catalog).'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-lg bg-[#B84720] hover:bg-[#D95C32] text-white font-semibold transition shadow-lg flex items-center gap-2 text-sm"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{t.hero_btn_catalog}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#legalitas"
                  className="px-7 py-3.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-semibold transition border border-stone-700 flex items-center gap-2 text-sm"
                >
                  <FileCheck2 className="w-4 h-4 text-[#D95C32]" />
                  <span>{t.hero_btn_legal}</span>
                </a>
              </div>

              {/* Highlight Badges / Statistical indicators */}
              <div className="grid grid-cols-2 gap-6 pt-8 border-t border-stone-800 max-w-md text-stone-300">
                <div>
                  <div className="text-lg sm:text-xl font-bold text-white">
                    {t.hero_stat_2_num}
                  </div>
                  <div className="text-xs text-stone-400">{t.hero_stat_2_txt}</div>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-white">
                    {t.hero_stat_3_num}
                  </div>
                  <div className="text-xs text-stone-400">{t.hero_stat_3_txt}</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-stone-800 bg-stone-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1000&auto=format&fit=crop"
                    alt="Spices and Supply Chain Warehouse"
                    className="w-full h-[450px] object-cover group-hover:scale-105 transition duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent flex items-end p-6">
                    <div className="text-white">
                      <div className="text-xs uppercase text-[#D95C32] font-bold tracking-wider mb-1">
                        {t.hero_card_tag}
                      </div>
                      <h4 className="text-lg font-serif font-semibold text-white">
                        {t.hero_card_title}
                      </h4>
                      <p className="text-xs text-stone-300 mt-1">{t.hero_card_sub}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section & Visi Misi */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="text-[#B84720] font-bold uppercase text-xs tracking-widest">
                {t.about_tag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2E1F18] mt-2 mb-6 leading-tight">
                {t.about_title}
              </h2>
              <p className="text-[#52453F] leading-relaxed mb-4 text-sm sm:text-base">
                {t.about_p1}
              </p>
              <p className="text-[#52453F] leading-relaxed mb-6 text-sm sm:text-base">
                {t.about_p2}
              </p>


            </div>

            {/* Visi & Misi Cards */}
            <div className="space-y-6">
              <div className="bg-[#FAF7F2] p-8 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="p-2 rounded bg-[#B84720] text-white">
                    <Eye className="w-4 h-4" />
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#2E1F18]">
                    {t.vision_title}
                  </h3>
                </div>
                <p className="text-sm text-[#52453F] leading-relaxed italic">
                  {t.vision_desc}
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-8 rounded-2xl border border-stone-200">
                <div className="flex items-center gap-3 mb-4">
                  <span className="p-2 rounded bg-[#2A5C43] text-white">
                    <Target className="w-4 h-4" />
                  </span>
                  <h3 className="text-xl font-bold font-serif text-[#2E1F18]">
                    {t.mission_title}
                  </h3>
                </div>
                <ul className="space-y-3.5 text-sm text-[#52453F]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B84720] shrink-0 mt-0.5" />
                    <span>{t.mission_1}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B84720] shrink-0 mt-0.5" />
                    <span>{t.mission_2}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B84720] shrink-0 mt-0.5" />
                    <span>{t.mission_3}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B84720] shrink-0 mt-0.5" />
                    <span>{t.mission_4}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Legalitas & Data Resmi Perusahaan */}
      <section id="legalitas" className="py-20 bg-stone-900 text-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-[#D95C32] font-bold uppercase text-xs tracking-widest">
              {t.legal_tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2 mb-3">
              {t.legal_title}
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed">{t.legal_desc}</p>
          </div>

          {/* Legal Records Table */}
          <div className="bg-stone-950 rounded-2xl border border-stone-800 overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <tbody className="divide-y divide-stone-800">
                  <tr className="hover:bg-stone-900/60 transition">
                    <td className="py-3.5 px-6 font-semibold text-stone-400 w-1/3">
                      {t.table_company_name}
                    </td>
                    <td className="py-3.5 px-6 font-bold text-white">
                      PT DomestiQ Hub Indonesia
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-900/60 transition">
                    <td className="py-3.5 px-6 font-semibold text-stone-400">
                      {t.table_entity_type}
                    </td>
                    <td className="py-3.5 px-6 text-stone-200">{t.table_entity_val}</td>
                  </tr>
                  <tr className="hover:bg-stone-900/60 transition">
                    <td className="py-3.5 px-6 font-semibold text-stone-400">
                      {t.table_ahu_number}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-[#D95C32] font-bold">
                      AHU-A125536.AH.01.30.Tahun 2026
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-900/60 transition">
                    <td className="py-3.5 px-6 font-semibold text-stone-400">
                      {t.table_est_date}
                    </td>
                    <td className="py-3.5 px-6 text-stone-200">{t.table_est_val}</td>
                  </tr>
                  <tr className="hover:bg-stone-900/60 transition">
                    <td className="py-3.5 px-6 font-semibold text-stone-400">NPWP</td>
                    <td className="py-3.5 px-6 font-mono text-stone-200">
                      1000 0000 1134 7794
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-900/60 transition">
                    <td className="py-3.5 px-6 font-semibold text-stone-400">
                      {t.table_address}
                    </td>
                    <td className="py-3.5 px-6 text-stone-200 leading-relaxed">
                      Perumahan The Magnolia Grande Blok B03 No.20 RT.001/008, Desa Karang
                      Rahayu, Kec. Karang Bahagia, Kab. Bekasi, Jawa Barat 17535
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-900/60 transition">
                    <td className="py-3.5 px-6 font-semibold text-stone-400">
                      {t.table_email}
                    </td>
                    <td className="py-3.5 px-6 font-mono text-[#D95C32]">
                      <a
                        href="mailto:fakhrariefal@domestiqhub.com"
                        className="hover:underline"
                      >
                        fakhrariefal@domestiqhub.com
                      </a>
                    </td>
                  </tr>
                  <tr className="hover:bg-stone-900/60 transition">
                    <td className="py-3.5 px-6 font-semibold text-stone-400">
                      {t.table_contact}
                    </td>
                    <td className="py-3.5 px-6 font-semibold text-emerald-400 font-mono">
                      <a
                        href="https://wa.me/6285706375004"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1.5"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5" />
                        <span>+62 857-0637-5004</span>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Ruang Lingkup Usaha & Undername Export */}
      <section id="layanan" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#B84720] font-bold uppercase text-xs tracking-widest">
              {t.scope_tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2E1F18] mt-2 mb-4">
              {t.scope_title}
            </h2>
            <p className="text-[#52453F] text-sm leading-relaxed">{t.scope_desc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Scope 1 */}
            <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-stone-200 hover:border-[#D95C32] transition shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-[#FBECE6] text-[#B84720] rounded-xl flex items-center justify-center text-xl mb-6">
                <Package className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#2E1F18] mb-3">
                {t.scope_item1_title}
              </h3>
              <p className="text-sm text-[#52453F] leading-relaxed">
                {t.scope_item1_desc}
              </p>
            </div>

            {/* Scope 2 */}
            <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-stone-200 hover:border-[#D95C32] transition shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-emerald-100 text-[#2A5C43] rounded-xl flex items-center justify-center text-xl mb-6">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#2E1F18] mb-3">
                {t.scope_item2_title}
              </h3>
              <p className="text-sm text-[#52453F] leading-relaxed">
                {t.scope_item2_desc}
              </p>
            </div>

            {/* Scope 3 */}
            <div className="p-8 rounded-2xl bg-[#FAF7F2] border border-stone-200 hover:border-[#D95C32] transition shadow-sm flex flex-col">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-xl mb-6">
                <Handshake className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#2E1F18] mb-3">
                {t.scope_item3_title}
              </h3>
              <p className="text-sm text-[#52453F] leading-relaxed">
                {t.scope_item3_desc}
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* Keunggulan Kompetitif */}
      <section className="py-24 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[#B84720] font-bold uppercase text-xs tracking-widest">
              {t.adv_tag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2E1F18] mt-2">
              {t.adv_title}
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-[#FAF7F2] border border-stone-200">
              <div className="w-10 h-10 bg-[#FBECE6] text-[#B84720] rounded-lg flex items-center justify-center text-lg mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#2E1F18] mb-2">{t.adv_item1_title}</h4>
              <p className="text-xs text-[#52453F] leading-relaxed">
                {t.adv_item1_desc}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF7F2] border border-stone-200">
              <div className="w-10 h-10 bg-emerald-100 text-[#2A5C43] rounded-lg flex items-center justify-center text-lg mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#2E1F18] mb-2">{t.adv_item2_title}</h4>
              <p className="text-xs text-[#52453F] leading-relaxed">
                {t.adv_item2_desc}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF7F2] border border-stone-200">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-lg mb-4">
                <Handshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#2E1F18] mb-2">{t.adv_item3_title}</h4>
              <p className="text-xs text-[#52453F] leading-relaxed">
                {t.adv_item3_desc}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF7F2] border border-stone-200">
              <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center text-lg mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#2E1F18] mb-2">{t.adv_item4_title}</h4>
              <p className="text-xs text-[#52453F] leading-relaxed">
                {t.adv_item4_desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RFQ & Contact Section */}
      <section id="contact" className="py-24 bg-[#1C1512] text-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#D95C32] font-bold uppercase text-xs tracking-widest">
                {t.contact_tag}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight">
                {t.contact_title}
              </h2>
              <p className="text-stone-300 text-sm leading-relaxed">{t.contact_desc}</p>

              <div className="space-y-5 pt-4 text-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-stone-800 text-[#D95C32] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t.contact_office_title}</h4>
                    <p className="text-stone-400 leading-relaxed text-xs">
                      Perumahan The Magnolia Grande Blok B03 No.20 RT.001/008, Desa Karang
                      Rahayu, Kec. Karang Bahagia, Kab. Bekasi, Jawa Barat 17535
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-stone-800 text-[#D95C32] flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t.contact_phone_title}</h4>
                    <p className="text-stone-400 font-mono text-xs">
                      <a
                        href="https://wa.me/6285706375004"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-emerald-400 transition"
                      >
                        +62 857-0637-5004
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-stone-800 text-[#D95C32] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{t.contact_email_title}</h4>
                    <p className="text-stone-400 font-mono text-xs">
                      <a
                        href="mailto:fakhrariefal@domestiqhub.com"
                        className="hover:text-[#D95C32] underline"
                      >
                        fakhrariefal@domestiqhub.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RFQ Form */}
            <div className="lg:col-span-7 bg-stone-900 p-8 rounded-2xl border border-stone-800">
              <h3 className="text-xl font-bold text-white mb-6 font-serif">
                {t.rfq_form_title}
              </h3>
              <form onSubmit={handleRfqSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {t.rfq_name_label}
                    </label>
                    <input
                      type="text"
                      required
                      value={rfqName}
                      onChange={(e) => setRfqName(e.target.value)}
                      placeholder="PT / Mitra Usaha"
                      className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D95C32]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-stone-300 mb-1">
                      {t.rfq_phone_label}
                    </label>
                    <input
                      type="tel"
                      required
                      value={rfqPhone}
                      onChange={(e) => setRfqPhone(e.target.value)}
                      placeholder="0812xxxxxxx"
                      className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D95C32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {t.rfq_service_label}
                  </label>
                  <select
                    value={rfqService}
                    onChange={(e) => setRfqService(e.target.value)}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D95C32]"
                  >
                    <option value="Pengadaan Rempah Kering (Ekspor/Lokal)">
                      Pengadaan Rempah Kering (Ekspor/Lokal)
                    </option>
                    <option value="Jasa Sewa Legalitas Undername Ekspor">
                      Jasa Sewa Legalitas Undername Ekspor
                    </option>
                    <option value="Kemitraan Distribusi & Pasokan Rutin">
                      Kemitraan Distribusi & Pasokan Rutin
                    </option>
                    <option value="Lainnya">Lainnya / Others</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    {t.rfq_desc_label}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={rfqDesc}
                    onChange={(e) => setRfqDesc(e.target.value)}
                    placeholder={t.rfq_desc_placeholder}
                    className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#D95C32]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#B84720] hover:bg-[#D95C32] text-white font-bold text-sm rounded-lg transition shadow-lg flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>{t.rfq_submit_btn}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-stone-400 py-12 border-t border-stone-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="font-medium text-stone-300">{t.footer_rights}</p>
            <p className="text-stone-500 mt-1 leading-relaxed">
              SK Kemenkumham RI: AHU-A125536.AH.01.30.Tahun 2026 | KBLI 46901 & 46902 |{' '}
              <a
                href="mailto:fakhrariefal@domestiqhub.com"
                className="text-stone-400 hover:underline"
              >
                fakhrariefal@domestiqhub.com
              </a>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-stone-200 transition">
              {t.nav_home}
            </a>
            <a href="#about" className="hover:text-stone-200 transition">
              {t.nav_about}
            </a>
            <a href="#legalitas" className="hover:text-stone-200 transition">
              {t.nav_legalitas}
            </a>
            <a href="#products" className="hover:text-stone-200 transition">
              {t.nav_products}
            </a>
            <a href="#contact" className="hover:text-stone-200 transition">
              {t.nav_contact}
            </a>
          </div>
        </div>
      </footer>

      {/* MODAL 1: Admin Authentication / Login Gate */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden animate-scale-in">
            <div className="p-6 bg-[#1C1512] text-white text-center relative">
              <button
                type="button"
                onClick={() => setLoginModalOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-12 h-12 bg-[#B84720] rounded-full flex items-center justify-center mx-auto mb-3 text-white text-lg shadow-lg">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold font-serif">{t.modal_login_title}</h3>
              <p className="text-xs text-stone-300 mt-1">{t.modal_login_sub}</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="p-6 space-y-4">
              {loginError && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-300 text-red-700 text-xs font-semibold">
                  {t.modal_login_err}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#2E1F18] mb-1">
                  {t.modal_login_user}
                </label>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  autoComplete="username"
                  className="w-full border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#B84720]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2E1F18] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#B84720]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setLoginModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-50 transition"
                >
                  {t.btn_cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B84720] hover:bg-[#943515] text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{t.btn_login_submit}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Form Tambah & Edit Produk */}
      {productModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <h3 className="text-lg font-bold text-[#2E1F18] font-serif">
                {productModalMode === 'add'
                  ? lang === 'en'
                    ? 'Add New Commodity'
                    : 'Tambah Produk Baru'
                  : lang === 'en'
                  ? 'Edit Commodity Details'
                  : 'Edit Detail Produk'}
              </h3>
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                className="text-stone-400 hover:text-stone-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#2E1F18] mb-1">
                  Nama Produk *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  placeholder="Contoh: Cengkeh Kering (Dried Cloves)"
                  className="w-full border border-stone-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#B84720]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2E1F18] mb-1">
                    Kategori *
                  </label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, category: e.target.value })
                    }
                    className="w-full border border-stone-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#B84720]"
                  >
                    <option value="Cengkeh">Cengkeh</option>
                    <option value="Kayu Manis">Kayu Manis</option>
                    <option value="Pala">Pala</option>
                    <option value="Lada">Lada</option>
                    <option value="Jahe">Jahe</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2E1F18] mb-1">
                    Grade / Kualitas *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.grade}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, grade: e.target.value })
                    }
                    placeholder="Contoh: Grade A / Lalpari"
                    className="w-full border border-stone-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#B84720]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#2E1F18] mb-1">
                    Kadar Air (Moisture)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.moisture}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, moisture: e.target.value })
                    }
                    placeholder="Contoh: Max 12%"
                    className="w-full border border-stone-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#B84720]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#2E1F18] mb-1">
                    Kemasan Standar
                  </label>
                  <input
                    type="text"
                    value={editingProduct.packaging}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, packaging: e.target.value })
                    }
                    placeholder="Contoh: 25 Kg / 50 Kg Bags"
                    className="w-full border border-stone-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#B84720]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2E1F18] mb-1">
                  URL Foto Utama Produk *
                </label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, image: e.target.value })
                  }
                  placeholder="/src/assets/images/... atau https://..."
                  className="w-full border border-stone-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#B84720]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2E1F18] mb-1 flex items-center justify-between">
                  <span>URL Galeri Foto Carousel (Opsional)</span>
                  <span className="text-[10px] text-stone-400 font-normal">Satu URL per baris</span>
                </label>
                <textarea
                  rows={2}
                  value={(editingProduct.images || []).join('\n')}
                  onChange={(e) => {
                    const lines = e.target.value.split('\n');
                    setEditingProduct({ ...editingProduct, images: lines });
                  }}
                  placeholder="https://images.unsplash.com/...&#10;https://..."
                  className="w-full border border-stone-300 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-[#B84720] font-mono"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Pengguna dapat menggeser foto di katalog menggunakan panah navigasi.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#2E1F18] mb-1">
                  Deskripsi Singkat *
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingProduct.desc}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, desc: e.target.value })
                  }
                  placeholder="Tuliskan spesifikasi, aroma, dan informasi keunggulan produk..."
                  className="w-full border border-stone-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:border-[#B84720]"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-sm font-semibold text-stone-600 hover:bg-stone-50 transition"
                >
                  {t.btn_cancel}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#B84720] hover:bg-[#943515] text-white rounded-lg text-sm font-semibold transition"
                >
                  {t.btn_save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CONFIRMATION DIALOG MODAL (Safe for iframes, no window.confirm) */}
      {confirmDialog.open && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-stone-200">
            <h4 className="text-base font-bold text-[#2E1F18] font-serif mb-2">
              {confirmDialog.title}
            </h4>
            <p className="text-xs text-stone-600 mb-6 leading-relaxed">
              {confirmDialog.description}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmDialog((prev) => ({ ...prev, open: false }))}
                className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-50 transition"
              >
                {t.btn_cancel}
              </button>
              <button
                type="button"
                onClick={confirmDialog.onConfirm}
                className="px-4 py-2 bg-[#B84720] hover:bg-[#943515] text-white rounded-lg text-xs font-bold transition shadow"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
