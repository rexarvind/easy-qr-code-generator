<?php 
namespace QRCodeGenerator\Block;

/**
 * analytical data store
*/
class QRCodeGenerator_Block 
{
	/**
     * [$_instance]
     * @var null
     */
    private static $_instance = null;

    /**
     * [instance] Initializes a singleton instance
     * @return [Actions]
     */
    public static function instance() {
        if ( is_null( self::$_instance ) ) {
            self::$_instance = new self();
            self::$_instance->define_constants();
        }
        return self::$_instance;
    }

	/**
	 * The Constructor.
	*/
	public function __construct() {
		add_action( 'init', [ $this, 'init' ] );
		add_action( 'enqueue_block_assets', [ $this, 'block_assets' ] );
	}

	public function init(){

		// Return early if this function does not exist.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}
		$this->register_block();
	}

	/**
     * Define constant if not already set
     *
     * @param  string $name
     * @param  string|bool $value
     * @return type
     */
    private function define( $name, $value ) {
        if ( ! defined( $name ) ) {
            define( $name, $value );
        }
    }

	/**
	 * Block assets.
	 */
	public function block_assets() {

		$dependencies = require_once( HTQRCODE_BLOCK_PATH . '/build/qr-code-generator.asset.php' );
		wp_enqueue_script(
		    'ht-qr-code-generator-blocks',
		    HTQRCODE_BLOCK_URL . '/build/qr-code-generator.js',
		    $dependencies['dependencies'],
		    $dependencies['version'],
		    true
		);

		wp_enqueue_style(
		    'ht-qr-code-generator-css',
		    HTQRCODE_BLOCK_URL . '/build/qr-code-generator.css',
		    array(),
		    $dependencies['version']
		);

		wp_localize_script(
			'ht-qr-code-generator-blocks',
			'htqrcodeGlobal',
			array(
				'pluginDirPath'   	=>  HTQRCODE_BLOCK_URL . '/build/',
			)
		);
	}

	private function register_block(){

		ob_start();
		include HTQRCODE_BLOCK_PATH . '/src/blocks/qrcode/block.json';
		$metadata = json_decode( ob_get_clean(), true );
		
		register_block_type(
			$metadata['name'], 
			array(
				'render_callback' => [ $this, 'qr_code_generator_block_callback' ],
				'attributes'  => $metadata['attributes'],
			)
		);
	}

	/**
	 * Define the required plugin constants
	 *
	 * @return void
	 */
	public function define_constants() {
		$this->define( 'HTQRCODE_BLOCK_FILE', __FILE__ );
		$this->define( 'HTQRCODE_BLOCK_PATH', __DIR__ );
		$this->define( 'HTQRCODE_BLOCK_URL', plugins_url( '', HTQRCODE_BLOCK_FILE ) );
	}

	public function qr_code_generator_block_callback($attributes){

		if($attributes['category'] == 'text' && empty($attributes['qrcode'])){
			$attributes['qrcode'] = esc_html__( 'HT QR Code Empty', 'ht-qrcode');
		}

		if(isset($attributes['qrCodeBackground']['id']) == false){
			$attributes['qr_bg_image'] = '';
		}

		if(isset($attributes['qrCodeLogo']['id']) == false){
			$attributes['logo'] = '';
		}

		if(!isset($attributes['quietzone'])){
			$attributes['quietzone'] = 0;
		}

        return htqr_shortcode($attributes, '');
	}
}

QRCodeGenerator_Block::instance();