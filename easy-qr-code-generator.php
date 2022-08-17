<?php

/**
 * Plugin Name: Easy QR Code Generator
 * Description: Generate custom and automatic site page URL QR codes.
 * Author: Byvex Team
 * Author URI: https://www.byvex.com/
 * Plugin URI: https://www.byvex.com/contact/
 * Version: 0.0.1
 * Text Domain: easy-qrcode
 * Requires at least: 5.2
 * License: GPL2
 * License URI: https://www.gnu.org./licenses/gpl-2.0.html
 */

class EasyQRCodeGenerator
{
    protected $plugin_name;
    protected $plugin_slug;
    protected $plugin_file;
    protected $plugin_version;
    protected $plugin_dir_url;

    function __construct()
    {
        $this->plugin_name = 'Easy QR Code Generator';
        $this->plugin_slug = 'easy-qrcode';
        $this->plugin_version = '0.0.1';
        $this->plugin_dir_url = plugin_dir_url(__FILE__);

        add_filter('plugin_action_links_' . plugin_basename(__FILE__), array($this, 'add_action_links'));
        add_filter('plugin_row_meta', array($this, 'add_plugin_row_meta'), 10, 2);
        add_action('admin_menu', array($this, 'add_plugin_page'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_public_assets'));
        add_action('wp_footer', array($this, 'qr_code_print'));
        add_shortcode('easy-qrcode', array($this, 'easy_qrcode_shortcode'));
    }

    function add_action_links($links)
    {
        $my_links = array('<a href="' . admin_url('admin.php?page=' . $this->plugin_slug . '-plugin-page') . '">Settings</a>');
        return array_merge($links, $my_links);
    }

    function add_plugin_row_meta($links, $file)
    {
        if (plugin_basename(__FILE__) == $file) {
            $row_meta = array(
                'easy_qrcode_support' => '<a href="' . esc_url('https://www.byvex.com/contact') . '" target="_blank" rel="noopener noreferrer" aria-label="' . esc_attr('Contact Support') . '">' . esc_html('Contact Support') . '</a>',
            );
            return array_merge($links, $row_meta);
        }
        return (array)$links;
    }

    function add_plugin_page()
    {
        add_menu_page(
            esc_html('Easy QR Code Generator'),
            esc_html('QR Codes'),
            'manage_options',
            $this->plugin_slug . '-plugin-page',
            array($this, 'show_plugin_page'),
            'data:image/svg+xml;base64,' . base64_encode('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-qr-code" viewBox="0 0 16 16"><path d="M2 2h2v2H2V2Z"/><path d="M6 0v6H0V0h6ZM5 1H1v4h4V1ZM4 12H2v2h2v-2Z"/><path d="M6 10v6H0v-6h6Zm-5 1v4h4v-4H1Zm11-9h2v2h-2V2Z"/><path d="M10 0v6h6V0h-6Zm5 1v4h-4V1h4ZM8 1V0h1v2H8v2H7V1h1Zm0 5V4h1v2H8ZM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8H6Zm0 0v1H2V8H1v1H0V7h3v1h3Zm10 1h-1V7h1v2Zm-1 0h-1v2h2v-1h-1V9Zm-4 0h2v1h-1v1h-1V9Zm2 3v-1h-1v1h-1v1H9v1h3v-2h1Zm0 0h3v1h-2v1h-1v-2Zm-4-1v1h1v-2H7v1h2Z"/><path d="M7 12h1v3h4v1H7v-4Zm9 2v2h-3v-1h2v-1h1Z"/></svg>'),
            69
        );
    }

    function enqueue_public_assets()
    {
        wp_register_script($this->plugin_slug . '-qr-script', $this->plugin_dir_url . 'public/js/easy.qrcode.min.js', array(), '4.4.12', false);
        wp_register_script($this->plugin_slug . '-main-script', $this->plugin_dir_url . 'public/js/main.js', array(), filemtime(plugin_dir_path(__FILE__) . 'public/js/main.js'), true);
    }

    function easy_qrcode_shortcode($atts = array(), $content = null, $tag = '')
    {
        $qr_id = uniqid();
        // normalize attribute keys, lowercase
        $atts = array_change_key_case((array) $atts, CASE_LOWER);
        $vars = shortcode_atts(
            array(
                'title' => 'QR Code Title',
                'sub-title' => '',
                'html-tag' => 'h3',
                'alignment' => 'left',
                'qrcode' => '',
                'category' => '',
                'size' => 300,
                'dot-scale' => 1,
                'qr-level' => 'L',
                'logo' => '',
                'logo-bg-color' => '',
                'logo-bg-transparent' => 'true',
                'logo-height' => 80,
                'logo-width' => 80,
                'logo-size' => '',
                'qr-bg-image' => '',
                'qr-bg-opacity' => 0.5,
                'qr-bg-autocolor' => 'false',
                'colordark' => '#000000',
                'colorlight' => '#ffffff',
                'po' => '',
                'pi' => '',
                'po-tl' => '',
                'pi-tl' => '',
                'po-tr' => '',
                'pi-tr' => '',
                'po-bl' => '',
                'pi-bl' => '',
                'ai' => '',
                'ao' => '',
                'timing' => '',
                'timing-h' => '',
                'timing-v' => '',
                'quietzone' => 3,
                'quietzone-color' => '#ffffff',
                'print' => 'true',
                'print-btn-text' => 'Print QR Code',
                'download' => 'true',
                'download-btn-text' => 'Download',
            ),
            $atts,
            $tag
        );

        // if $content and $qrcode variable is empty, then use default page URL
        if (empty($content) && empty($vars['qrcode']) || $vars['category'] === 'current-page-url') {
            if (is_archive()) {
                $archive = get_queried_object();
                $content = get_term_link($archive->term_id);
            } else {
                $content = get_permalink();
            }
        } else if (!empty($content)) {
            $content = do_shortcode($content);
        } else if (!empty($qrcode)) {
            $content = $qrcode;
        }

        // if $print_btn_text variable is empty, then print "Print QR Code" text
        if (empty($vars['print-btn-text'])) $vars['print-btn-text'] = 'Print QR Code';
        // if $download_btn_text variable is empty, then print "Download" text
        if (empty($vars['download-btn-text'])) $vars['download-btn-text'] = 'Download';

        wp_enqueue_script($this->plugin_slug . '-qr-script');
        wp_enqueue_script($this->plugin_slug . '-main-script');
        ob_start();
?>
        <div class="easy-qrcode" style="text-align:<?php echo esc_attr($vars['alignment']); ?>">
            <div id="easy-qrcode-id-<?php echo esc_attr($qr_id); ?>" class="easy-qrcode-<?php echo esc_attr($qr_id); ?> east-qrcode-box east-qrcode-<?php echo esc_attr($qr_id); ?>"></div>
            <div id="easy-qrcode-btns-<?php echo esc_attr($qr_id); ?>" class="easy-qrcode-btns">
                <?php if (esc_attr($vars['print'] == 'true')) { ?>
                    <button class="easy-qrcode-btn easy-qrcode-btn-print wp-block-button btn button" type="button" onclick="print_easy_qrcode('easy-qrcode-id-<?php echo esc_attr($qr_id); ?>')"><?php echo esc_html__($vars['print-btn-text'], 'easy-qrcode') ?></button>
                <?php } ?>
                <?php if (esc_attr($vars['download'] == 'true')) { ?>
                    <button class="easy-qrcode-btn easy-qrcode-btn-download wp-block-button btn button" type="button" data-target="easy-qrcode-img-<?php echo esc_attr($qr_id); ?>"><?php echo esc_html__($vars['download-btn-text'], 'easy-qrcode'); ?></button>
                <?php } ?>
            </div>
        </div>
        <script type="text/javascript">
            document.addEventListener("DOMContentLoaded", () => {
                new QRCode(document.getElementById('easy-qrcode-id-<?php echo esc_js($qr_id); ?>'), {
                    text: "<?php echo esc_js($content); ?>",
                    width: <?php echo esc_js($vars['size']); ?>,
                    height: <?php echo esc_js($vars['size']); ?>,
                    dotScale: <?php echo esc_js($vars['dot-scale']); ?>,
                    correctLevel: QRCode.CorrectLevel.<?php echo esc_js($vars['qr-level']); ?>,
                    logo: "<?php echo esc_js($vars['logo']); ?>",
                    logoWidth: <?php echo esc_js((isset($vars['logo-size']) && !empty($vars['logo-size'])) ? $vars['logo-size'] : $vars['logo-width']); ?>,
                    logoHeight: <?php echo esc_js((isset($vars['logo-size']) && !empty($vars['logo-size'])) ? $vars['logo-size'] : $vars['logo-height']); ?>,
                    logoBackgroundColor: "<?php echo esc_js($vars['logo-bg-color']); ?>",
                    logoBackgroundTransparent: <?php echo esc_js($vars['logo-bg-transparent']); ?>,
                    backgroundImage: "<?php echo esc_js($vars['qr-bg-image']); ?>",
                    backgroundImageAlpha: <?php echo esc_js($vars['qr-bg-opacity']); ?>,
                    autoColor: <?php echo esc_js($vars['qr-bg-autocolor']); ?>,
                    colorDark: "<?php echo esc_js($vars['colordark']); ?>",
                    colorLight: "<?php echo esc_js($vars['colorlight']); ?>",
                    PO: "<?php echo esc_js($vars['po']); ?>",
                    PI: "<?php echo esc_js($vars['pi']); ?>",
                    PO_TL: "<?php echo esc_js($vars['po-tl']); ?>",
                    PI_TL: "<?php echo esc_js($vars['pi-tl']); ?>",
                    PO_TR: "<?php echo esc_js($vars['po-tr']); ?>",
                    PI_TR: "<?php echo esc_js($vars['pi-tr']); ?>",
                    PO_BL: "<?php echo esc_js($vars['po-bl']); ?>",
                    PI_BL: "<?php echo esc_js($vars['pi-bl']); ?>",
                    AI: "<?php echo esc_js($vars['ai']); ?>",
                    AO: "<?php echo esc_js($vars['ao']); ?>",
                    timing: "<?php echo esc_js($vars['timing']); ?>",
                    timing_H: "<?php echo esc_js($vars['timing-h']); ?>",
                    timing_V: "<?php echo esc_js($vars['timing-v']); ?>",
                    quietZone: <?php echo esc_js($vars['quietzone']); ?>,
                    quietZoneColor: "<?php echo esc_js($vars['quietzone-color']); ?>",
                    onRenderingEnd(qrCodeOptions, dataURL) {
                        if (dataURL) {
                            var imgEL = document.querySelector('#easy-qrcode-id-<?php echo esc_js($qr_id); ?> img');
                            if (imgEL) {
                                imgEL.src = dataURL;
                            } else {
                                var imgEL = document.createElement('img');
                                imgEL.src = dataURL;
                                document.getElementById('easy-qrcode-id-<?php echo esc_js($qr_id); ?>').appendChild(imgEL);
                            }
                            document.querySelector('#easy-qrcode-id-<?php echo esc_js($qr_id); ?> canvas').style.display = 'none'
                            imgEL.setAttribute('id', 'easy-qrcode-img-<?php echo esc_js($qr_id); ?>');
                            imgEL.setAttribute('alt', 'Scan Me');
                        } else {
                            console.warn('Image used in QR Code is not hosted on same domain, can not download or print.')
                            var easy_qrcode_btns = document.getElementById('easy-qrcode-btns-<?php echo esc_js($qr_id); ?>')
                            if (easy_qrcode_btns) easy_qrcode_btns.style.display = 'none';
                        }
                    },
                });
            });
        </script>
    <?php
        return ob_get_clean();
    }

    function qr_code_print()
    { ?>
        <iframe name="easy-qrcode-print-frame" width="0" height="0" frameborder="0" src="about:blank" title="QR Code plugin by Byvex Team" style="visibility:hidden;display:none;"></iframe>
    <?php
    }

    function show_plugin_page()
    {
        $main_tab = (!isset($_GET['tab']) || isset($_GET['tab']) && $_GET['tab'] != 'shortcode' && $_GET['tab'] != 'contact');
        $shortcode_tab = (isset($_GET['tab']) && $_GET['tab'] === 'shortcode');
        $contact_tab = (isset($_GET['tab']) && $_GET['tab'] === 'contact');

    ?>
        <div class="wrap">
            <h1><strong><?php echo $this->plugin_name; ?></strong></h1>
            <p>Try Our Live Shortcode Generator: <a href="https://www.byvex.com/easy-qr-code-shortcode-generator/" target="_blank" rel="noopener noreferrer nofollow">https://www.byvex.com/easy-qr-code-shortcode-generator/</a></p>

            <div class="nav-tab-wrapper">
                <a href="<?php echo admin_url('admin.php?page=' . $this->plugin_slug . '-plugin-page'); ?>" class="nav-tab <?php echo $main_tab ? 'nav-tab-active' : ''; ?>"><?php esc_html_e('Overview'); ?></a>
                <a href="<?php echo esc_url(add_query_arg(array('tab' => 'shortcode'), admin_url('admin.php?page=' . $this->plugin_slug . '-plugin-page'))); ?>" class="nav-tab <?php echo $shortcode_tab ? 'nav-tab-active' : ''; ?>"><?php esc_html_e('Shortcode'); ?></a>
                <a href="<?php echo esc_url(add_query_arg(array('tab' => 'contact'), admin_url('admin.php?page=' . $this->plugin_slug . '-plugin-page'))); ?>" class="nav-tab <?php echo $contact_tab ? 'nav-tab-active' : ''; ?>"><?php esc_html_e('Contact'); ?></a>
            </div>

            <?php if ($main_tab) { ?>
                <h2>Overview of QR Code</h2>
                <img src="<?php echo $this->plugin_dir_url; ?>admin/images/qrcode-overview-1.jpg" alt="" style="width:100%;height:auto;" />
                <img src="<?php echo $this->plugin_dir_url; ?>admin/images/qrcode-overview-2.jpg" alt="" style="width:100%;height:auto;" />
            <?php } elseif ($shortcode_tab) { ?>
                <p>After installing plugin you can use shortcode.</p>
                <img src="<?php echo $this->plugin_dir_url; ?>admin/images/shortcode-in-editor.png" style="max-width:100%;height:auto;" alt="" />
                <h2>Shortcode Parameters</h2>
                <p><code>[easy-qrcode title="" sub-title="" html-tag="" alignment="" size="" dot-scale="" qr-level="" logo="" logo-size="" logo-bg-color="" logo-bg-transparent="" qr-bg-image="" qr-bg-opacity="" qr-bg-autoColor="" colordark="" colorlight="" po="" pi="" po-tl="" pi-tl="" po-tr="" pi-tr="" po-bl="" pi-bl="" ai="" ao="" timing="" timing-h="" timing-v="" quietzone="" quietzone-color="" print="true" print-btn-text="Print QR Code" download="true" download-btn-txt="true"][/easy-qrcode]</code></p>

                <h2>Parameters Details</h2>
                <table class="wp-list-table widefat striped table-view-list">
                    <thead>
                        <tr>
                            <th>Shortcode option</th>
                            <th>Description</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>alignment</td>
                            <td>QR Code alignment</td>
                            <td>[easy-qrcode alignment="center"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>size</td>
                            <td>QR Code size</td>
                            <td>[easy-qrcode size="300"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>dot-scale</td>
                            <td>QR Code Dot Scale Size (0.1 to 1)</td>
                            <td>[easy-qrcode dot-scale="1"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>qr-level</td>
                            <td>Code reading labels (L, M, Q, H)</td>
                            <td>[easy-qrcode qr-level="H"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>logo</td>
                            <td>QR Code logo</td>
                            <td>[easy-qrcode logo="https://example.com/logo.png"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>logo-size</td>
                            <td>Logo size</td>
                            <td>[easy-qrcode logo-size="60"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>logo-bg-color</td>
                            <td>Logo Background Color</td>
                            <td>[easy-qrcode logo-bg-color="#fafafa"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>logo-bg-transparent</td>
                            <td>Logo Background transparent or not (true/false)</td>
                            <td>[easy-qrcode logo-bg-transparent="true"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>qr-bg-image</td>
                            <td>QR Code Background Image</td>
                            <td>[easy-qrcode qr-bg-image="https://example.com/background-image.png"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>qr-bg-opacity</td>
                            <td>QR Code Background Image Opacity (0.1 to 1)</td>
                            <td>[easy-qrcode qr-bg-opacity="0.7"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>qr-bg-autocolor</td>
                            <td>QR Code BG dot Auto Color Enable or Disable</td>
                            <td>[easy-qrcode qr-bg-autocolor="true"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>colordark</td>
                            <td>QR Code QR Dot Color</td>
                            <td>[easy-qrcode colordark="#000000"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>colorlight</td>
                            <td>QR Code Background Color</td>
                            <td>[easy-qrcode colorlight="#ffffff"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>po</td>
                            <td>QR Code Pattern Outer Global Color</td>
                            <td>[easy-qrcode po="#e1622f"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>pi</td>
                            <td>QR Code Pattern Inner Global Color</td>
                            <td>[easy-qrcode pi="#aa5b71"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>po-tl</td>
                            <td>QR Code Pattern Outer Top Left Color</td>
                            <td>[easy-qrcode po-tl="#e1622f"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>pi-tl</td>
                            <td>QR Code Pattern Inner Top Left Color</td>
                            <td>[easy-qrcode pi-tl="#b7d28d"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>po-tr</td>
                            <td>QR Code Pattern Outer Top Right Color</td>
                            <td>[easy-qrcode po-tr="#aa5b71"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>pi-tr</td>
                            <td>QR Code Pattern Inner Top Right Color</td>
                            <td>[easy-qrcode pi-tr="#aa5b71"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>po-bl</td>
                            <td>QR Code Pattern Outer Bottom Left Color</td>
                            <td>[easy-qrcode po-bl="#c17e61"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>pi-bl</td>
                            <td>QR Code Pattern Inner Bottom Left Color</td>
                            <td>[easy-qrcode pi-bl="#c17e61"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>ao</td>
                            <td>Alignment Outer Color</td>
                            <td>[easy-qrcode ao="#7d26cd"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>ai</td>
                            <td>Alignment Inner Color</td>
                            <td>[easy-qrcode ai="#27408b"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>timing</td>
                            <td>Timing Global Color</td>
                            <td>[easy-qrcode timing="#111111"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>timing-h</td>
                            <td>Timing Horizontal Color</td>
                            <td>[easy-qrcode timing-h="#ff6600"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>timing-v</td>
                            <td>Timing Vertical Color</td>
                            <td>[easy-qrcode timing-v="#cc0033"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>quietzone</td>
                            <td>Border/Zone Pixels</td>
                            <td>[easy-qrcode quietzone="30"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>quietzone-color</td>
                            <td>Border/Zone Color</td>
                            <td>[easy-qrcode quietzone-color="#00ced1"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>print</td>
                            <td>Print Button Enable</td>
                            <td>[easy-qrcode print="true"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>print-btn-text</td>
                            <td>Print Button Text</td>
                            <td>[easy-qrcode print-btn-text="Print QR Code"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>download</td>
                            <td>Download Button Enable</td>
                            <td>[easy-qrcode download="true"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                        <tr>
                            <td>download-btn-text</td>
                            <td>Download Button Text</td>
                            <td>[easy-qrcode download-btn-text="Download"]Your Content Here.[/easy-qrcode]</td>
                        </tr>
                    </tbody>
                </table>

            <?php } elseif ($contact_tab) { ?>
                <h2>Byvex Technologies</h2>
                <p>Website Design and Development Agency. We provide many website related services, some of which are as follow:</p>
                <ol>
                    <li>E-Commerce Website</li>
                    <li>WordPress Blog</li>
                    <li>Custom WordPress Theme</li>
                    <li>Static Website and Landing Pages</li>
                    <li>Core PHP Website</li>
                    <li>ReactJS or VueJS website</li>
                    <li>API Development</li>
                    <li>Design to HTML</li>
                    <li>Custom Code Modifications, and a lot more.</li>
                </ol>
                <p>Website: <a href="https://www.byvex.com/" target="_blank" rel="noopener noreferrer nofollow">www.byvex.com</a>
                    <br />Email us: <a href="mailto:info@byvex.com">info@byvex.com</a>
                    <br />WhatsApp: <a href="https://api.whatsapp.com/send?phone=919984495055&text=Hi%20Pawan%2C%20I%20have%20a%20project%20for%20you" target="_blank" rel="noopener noreferrer nofollow">+91 9984495055</a>
                </p>
            <?php } ?>


        </div>
<?php
    }
}

$easyQRCodeGenerator = new EasyQRCodeGenerator();
