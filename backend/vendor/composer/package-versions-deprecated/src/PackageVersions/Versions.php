<?php

declare(strict_types=1);

namespace PackageVersions;

use Composer\InstalledVersions;
use OutOfBoundsException;

class_exists(InstalledVersions::class);

/**
 * This class is generated by composer/package-versions-deprecated, specifically by
 * @see \PackageVersions\Installer
 *
 * This file is overwritten at every run of `composer install` or `composer update`.
 *
 * @deprecated in favor of the Composer\InstalledVersions class provided by Composer 2. Require composer-runtime-api:^2 to ensure it is present.
 */
final class Versions
{
    /**
     * @deprecated please use {@see self::rootPackageName()} instead.
     *             This constant will be removed in version 2.0.0.
     */
    const ROOT_PACKAGE_NAME = '__root__';

    /**
     * Array of all available composer packages.
     * Dont read this array from your calling code, but use the \PackageVersions\Versions::getVersion() method instead.
     *
     * @var array<string, string>
     * @internal
     */
    const VERSIONS          = array (
  'api-platform/core' => 'v2.6.6@25c71b216473844cdbe5bf284ccbeeb26acd76e7',
  'composer/package-versions-deprecated' => '1.11.99.4@b174585d1fe49ceed21928a945138948cb394600',
  'doctrine/annotations' => '1.13.2@5b668aef16090008790395c02c893b1ba13f7e08',
  'doctrine/cache' => '2.1.1@331b4d5dbaeab3827976273e9356b3b453c300ce',
  'doctrine/collections' => '1.6.8@1958a744696c6bb3bb0d28db2611dc11610e78af',
  'doctrine/common' => '3.1.2@a036d90c303f3163b5be8b8fde9b6755b2be4a3a',
  'doctrine/dbal' => '2.13.4@2411a55a2a628e6d8dd598388ab13474802c7b6e',
  'doctrine/deprecations' => 'v0.5.3@9504165960a1f83cc1480e2be1dd0a0478561314',
  'doctrine/doctrine-bundle' => '2.4.3@62a188ce2192e6b3b7a2019c26c5001778818b83',
  'doctrine/doctrine-migrations-bundle' => '3.1.1@91f0a5e2356029575f3038432cc188b12f9d5da5',
  'doctrine/event-manager' => '1.1.1@41370af6a30faa9dc0368c4a6814d596e81aba7f',
  'doctrine/inflector' => '2.0.3@9cf661f4eb38f7c881cac67c75ea9b00bf97b210',
  'doctrine/instantiator' => '1.4.0@d56bf6102915de5702778fe20f2de3b2fe570b5b',
  'doctrine/lexer' => '1.2.1@e864bbf5904cb8f5bb334f99209b48018522f042',
  'doctrine/migrations' => '3.2.1@818e31703b4fb353c0c23caa714273fc64efa675',
  'doctrine/orm' => '2.10.1@f346379c7bf39a9f46771cfd9043e0eb2dd98793',
  'doctrine/persistence' => '2.2.2@4ce4712e6dc84a156176a0fbbb11954a25c93103',
  'doctrine/sql-formatter' => '1.1.1@56070bebac6e77230ed7d306ad13528e60732871',
  'egulias/email-validator' => '3.1.2@ee0db30118f661fb166bcffbf5d82032df484697',
  'fig/link-util' => '1.1.2@5d7b8d04ed3393b4b59968ca1e906fb7186d81e8',
  'friendsofphp/proxy-manager-lts' => 'v1.0.5@006aa5d32f887a4db4353b13b5b5095613e0611f',
  'laminas/laminas-code' => '3.4.1@1cb8f203389ab1482bf89c0e70a04849bacd7766',
  'laminas/laminas-eventmanager' => '3.4.0@a93fd278c97b2d41ebbce5ba048a24e3e6f580ba',
  'laminas/laminas-zendframework-bridge' => '1.4.0@bf180a382393e7db5c1e8d0f2ec0c4af9c724baf',
  'lcobucci/jwt' => '3.4.6@3ef8657a78278dfeae7707d51747251db4176240',
  'lexik/jwt-authentication-bundle' => 'v2.13.0@d3dbf97f9a2f7cead53767111234bb16b8726681',
  'monolog/monolog' => '1.26.1@c6b00f05152ae2c9b04a448f99c7590beb6042f5',
  'namshi/jose' => '7.2.3@89a24d7eb3040e285dd5925fcad992378b82bcff',
  'nelmio/cors-bundle' => '2.1.1@0b964b665016dfb61dd0fd2bb8c24afb1ae45a93',
  'phpdocumentor/reflection-common' => '2.2.0@1d01c49d4ed62f25aa84a747ad35d5a16924662b',
  'phpdocumentor/reflection-docblock' => '5.2.2@069a785b2141f5bcf49f3e353548dc1cce6df556',
  'phpdocumentor/type-resolver' => '1.5.1@a12f7e301eb7258bb68acd89d4aefa05c2906cae',
  'psr/cache' => '1.0.1@d11b50ad223250cf17b86e38383413f5a6764bf8',
  'psr/container' => '1.1.1@8622567409010282b7aeebe4bb841fe98b58dcaf',
  'psr/link' => '1.0.0@eea8e8662d5cd3ae4517c9b864493f59fca95562',
  'psr/log' => '1.1.4@d49695b909c3b7628b6289db5479a1c204601f11',
  'swiftmailer/swiftmailer' => 'v6.2.7@15f7faf8508e04471f666633addacf54c0ab5933',
  'symfony/asset' => 'v4.4.27@1910a978dbe03503d9ee72408e2fef7c4041d97d',
  'symfony/cache' => 'v4.4.31@4d9074f2777dfde2b78c5c60affa66c5e7518117',
  'symfony/cache-contracts' => 'v2.4.0@c0446463729b89dd4fa62e9aeecc80287323615d',
  'symfony/config' => 'v4.4.30@d9ea72de055cd822e5228ff898e2aad2f52f76b0',
  'symfony/console' => 'v4.4.30@a3f7189a0665ee33b50e9e228c46f50f5acbed22',
  'symfony/debug' => 'v4.4.31@43ede438d4cb52cd589ae5dc070e9323866ba8e0',
  'symfony/dependency-injection' => 'v4.4.31@75dd7094870feaa5be9ed2b6b1efcfc2b7d3b9b4',
  'symfony/deprecation-contracts' => 'v2.4.0@5f38c8804a9e97d23e0c8d63341088cd8a22d627',
  'symfony/doctrine-bridge' => 'v4.4.31@5129c19ad55f28e52b84954f7e35d842f0134d59',
  'symfony/dotenv' => 'v4.4.29@2b078eff6268875f4639cf16e48e321982c671bb',
  'symfony/error-handler' => 'v4.4.30@51f98f7aa99f00f3b1da6bafe934e67ae6ba6dc5',
  'symfony/event-dispatcher' => 'v4.4.30@2fe81680070043c4c80e7cedceb797e34f377bac',
  'symfony/event-dispatcher-contracts' => 'v1.1.9@84e23fdcd2517bf37aecbd16967e83f0caee25a7',
  'symfony/expression-language' => 'v4.4.30@78a014771042079cca30716c8471e7a0b985bd22',
  'symfony/filesystem' => 'v4.4.27@517fb795794faf29086a77d99eb8f35e457837a7',
  'symfony/finder' => 'v4.4.30@70362f1e112280d75b30087c7598b837c1b468b6',
  'symfony/flex' => 'v1.17.1@782ef2269622b8349c4bc3dc795fc79d39e8a5b2',
  'symfony/framework-bundle' => 'v4.4.31@cc936cd733d94e4752a26cfc25a4825724571765',
  'symfony/http-client-contracts' => 'v2.4.0@7e82f6084d7cae521a75ef2cb5c9457bbda785f4',
  'symfony/http-foundation' => 'v4.4.30@09b3202651ab23ac8dcf455284a48a3500e56731',
  'symfony/http-kernel' => 'v4.4.32@f7bda3ea8f05ae90627400e58af5179b25ce0f38',
  'symfony/inflector' => 'v4.4.27@2eb2095edc03a4f0780a417c2cf5b6f6ac5a7284',
  'symfony/mime' => 'v4.4.31@c4fd68f54f608c639ddebecfc61746a86134bf4a',
  'symfony/monolog-bridge' => 'v4.4.27@9882c03d4c237d77ba5b2845639700653dcd9a84',
  'symfony/monolog-bundle' => 'v3.7.0@4054b2e940a25195ae15f0a49ab0c51718922eb4',
  'symfony/polyfill-intl-idn' => 'v1.23.0@65bd267525e82759e7d8c4e8ceea44f398838e65',
  'symfony/polyfill-intl-normalizer' => 'v1.23.0@8590a5f561694770bdcd3f9b5c69dde6945028e8',
  'symfony/polyfill-mbstring' => 'v1.23.1@9174a3d80210dca8daa7f31fec659150bbeabfc6',
  'symfony/polyfill-php72' => 'v1.23.0@9a142215a36a3888e30d0a9eeea9766764e96976',
  'symfony/polyfill-php73' => 'v1.23.0@fba8933c384d6476ab14fb7b8526e5287ca7e010',
  'symfony/polyfill-php80' => 'v1.23.1@1100343ed1a92e3a38f9ae122fc0eb21602547be',
  'symfony/polyfill-php81' => 'v1.23.0@e66119f3de95efc359483f810c4c3e6436279436',
  'symfony/property-access' => 'v4.4.30@727edd3a5fd2feca1562e0f2520ed6888805c0fa',
  'symfony/property-info' => 'v4.4.31@b9955daf3605753c6054ef1dc3ddee993c7ccb5b',
  'symfony/proxy-manager-bridge' => 'v4.4.27@7731460a4e192b2377cae0592df4323fc5cd14ea',
  'symfony/routing' => 'v4.4.30@9ddf033927ad9f30ba2bfd167a7b342cafa13e8e',
  'symfony/security-bundle' => 'v4.4.27@49a09063f633d059b34d53c47adee7144c883bbe',
  'symfony/security-core' => 'v4.4.31@99ae75e257d5a4fd8537464d98d1dede0180b611',
  'symfony/security-csrf' => 'v4.4.27@e5bba6497d2f1178e23615d5ca01933a29b65a45',
  'symfony/security-guard' => 'v4.4.27@68d4be4fe90f4eccbbf379d478f2067550a25469',
  'symfony/security-http' => 'v4.4.30@ebbf7f1c871c1c3c1d54738d0e0f3ae7815a559b',
  'symfony/serializer' => 'v4.4.31@a10b610f75349dbee1d3ad05c7a2cbf4f1872e34',
  'symfony/service-contracts' => 'v2.4.0@f040a30e04b57fbcc9c6cbcf4dbaa96bd318b9bb',
  'symfony/stopwatch' => 'v4.4.27@c85d997af06a58ba83e2d2538e335b894c24523d',
  'symfony/swiftmailer-bundle' => 'v3.5.2@6b72355549f02823a2209180f9c035e46ca3f178',
  'symfony/var-dumper' => 'v4.4.31@1f12cc0c2e880a5f39575c19af81438464717839',
  'symfony/var-exporter' => 'v4.4.31@ae5e31445bef9e27d0999ba2354dc04049508ede',
  'symfony/web-link' => 'v4.4.27@a55c3a0a5da44965f39cf5f770a2e5a4a95c2c68',
  'symfony/yaml' => 'v4.4.29@3abcc4db06d4e776825eaa3ed8ad924d5bc7432a',
  'webmozart/assert' => '1.10.0@6964c76c7804814a842473e0c8fd15bab0f18e25',
  'willdurand/negotiation' => '3.0.0@04e14f38d4edfcc974114a07d2777d90c98f3d9c',
  'nikic/php-parser' => 'v4.13.0@50953a2691a922aa1769461637869a0a2faa3f53',
  'symfony/maker-bundle' => 'v1.34.0@c1ead8581cddeb4b2b9dcc8a3f00910093c4e5e8',
  'paragonie/random_compat' => '2.*@3105ed576c62643f27c3826bdbd299a5da563201',
  'symfony/polyfill-ctype' => '*@3105ed576c62643f27c3826bdbd299a5da563201',
  'symfony/polyfill-iconv' => '*@3105ed576c62643f27c3826bdbd299a5da563201',
  'symfony/polyfill-php71' => '*@3105ed576c62643f27c3826bdbd299a5da563201',
  'symfony/polyfill-php70' => '*@3105ed576c62643f27c3826bdbd299a5da563201',
  'symfony/polyfill-php56' => '*@3105ed576c62643f27c3826bdbd299a5da563201',
  '__root__' => 'dev-master@3105ed576c62643f27c3826bdbd299a5da563201',
);

    private function __construct()
    {
    }

    /**
     * @psalm-pure
     *
     * @psalm-suppress ImpureMethodCall we know that {@see InstalledVersions} interaction does not
     *                                  cause any side effects here.
     */
    public static function rootPackageName() : string
    {
        if (!self::composer2ApiUsable()) {
            return self::ROOT_PACKAGE_NAME;
        }

        return InstalledVersions::getRootPackage()['name'];
    }

    /**
     * @throws OutOfBoundsException If a version cannot be located.
     *
     * @psalm-param key-of<self::VERSIONS> $packageName
     * @psalm-pure
     *
     * @psalm-suppress ImpureMethodCall we know that {@see InstalledVersions} interaction does not
     *                                  cause any side effects here.
     */
    public static function getVersion(string $packageName): string
    {
        if (self::composer2ApiUsable()) {
            return InstalledVersions::getPrettyVersion($packageName)
                . '@' . InstalledVersions::getReference($packageName);
        }

        if (isset(self::VERSIONS[$packageName])) {
            return self::VERSIONS[$packageName];
        }

        throw new OutOfBoundsException(
            'Required package "' . $packageName . '" is not installed: check your ./vendor/composer/installed.json and/or ./composer.lock files'
        );
    }

    private static function composer2ApiUsable(): bool
    {
        if (!class_exists(InstalledVersions::class, false)) {
            return false;
        }

        if (method_exists(InstalledVersions::class, 'getAllRawData')) {
            $rawData = InstalledVersions::getAllRawData();
            if (count($rawData) === 1 && count($rawData[0]) === 0) {
                return false;
            }
        } else {
            $rawData = InstalledVersions::getRawData();
            if ($rawData === null || $rawData === []) {
                return false;
            }
        }

        return true;
    }
}
