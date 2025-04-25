-- CreateTable
CREATE TABLE `_prisma_custom_seeds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `_prisma_custom_seeds_key_key`(`key`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facilities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `region` ENUM('HOKKAIDO', 'TOHOKU', 'KANTO', 'CHUBU', 'KINKI', 'CHUGOKU', 'SHIKOKU', 'KYUSHU', 'OKINAWA') NOT NULL,
    `prefecture` ENUM('HOKKAIDO', 'AOMORI', 'IWATE', 'MIYAGI', 'AKITA', 'YAMAGATA', 'FUKUSHIMA', 'IBARAKI', 'TOCHIGI', 'GUNMA', 'SAITAMA', 'CHIBA', 'TOKYO', 'KANAGAWA', 'NIIGATA', 'TOYAMA', 'ISHIKAWA', 'FUKUI', 'YAMANASHI', 'NAGANO', 'GIFU', 'SHIZUOKA', 'AICHI', 'MIE', 'SHIGA', 'KYOTO', 'OSAKA', 'HYOGO', 'NARA', 'WAKAYAMA', 'TOTTORI', 'SHIMANE', 'OKAYAMA', 'HIROSHIMA', 'YAMAGUCHI', 'TOKUSHIMA', 'KAGAWA', 'EHIME', 'KOCHI', 'FUKUOKA', 'SAGA', 'NAGASAKI', 'KUMAMOTO', 'OITA', 'MIYAZAKI', 'KAGOSHIMA', 'OKINAWA') NOT NULL,
    `address` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `halls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `facility_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `seats_number` INTEGER NOT NULL,

    INDEX `halls_facility_id_idx`(`facility_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auth_0_provider_accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `account_id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NULL,
    `email` VARCHAR(100) NULL,
    `image_url` TEXT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `auth_0_provider_accounts_uid_key`(`uid`),
    UNIQUE INDEX `auth_0_provider_accounts_account_id_key`(`account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `groups` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `auth_0_provider_account_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `tel` VARCHAR(100) NULL,
    `image_url` TEXT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `groups_uid_key`(`uid`),
    UNIQUE INDEX `groups_auth_0_provider_account_id_key`(`auth_0_provider_account_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `group_discounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `group_id` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `group_discounts_uid_key`(`uid`),
    UNIQUE INDEX `group_discounts_group_id_key`(`group_id`),
    INDEX `group_discounts_group_id_idx`(`group_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `concerts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `group_id` INTEGER NOT NULL,
    `hall_id` INTEGER NOT NULL,
    `category` ENUM('ORCHESTRA', 'BRASS_BAND', 'ENSEMBLE', 'CHORUS') NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `open_time` DATETIME(0) NOT NULL,
    `start_time` DATETIME(0) NOT NULL,
    `end_time` DATETIME(0) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `concerts_uid_key`(`uid`),
    INDEX `concerts_group_id_idx`(`group_id`),
    INDEX `concerts_hall_id_idx`(`hall_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `available_insertion_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `concert_id` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `available_insertion_settings_uid_key`(`uid`),
    UNIQUE INDEX `available_insertion_settings_concert_id_key`(`concert_id`),
    INDEX `available_insertion_settings_concert_id_idx`(`concert_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `origin_pamphlets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `concert_id` INTEGER NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `version_id` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `origin_pamphlets_uid_key`(`uid`),
    UNIQUE INDEX `origin_pamphlets_concert_id_key`(`concert_id`),
    INDEX `origin_pamphlets_concert_id_idx`(`concert_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `edited_pamphlets` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `concert_id` INTEGER NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `version_id` VARCHAR(100) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `edited_pamphlets_uid_key`(`uid`),
    UNIQUE INDEX `edited_pamphlets_concert_id_key`(`concert_id`),
    INDEX `edited_pamphlets_concert_id_idx`(`concert_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pamphlet_qrs` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `concert_id` INTEGER NOT NULL,
    `key` TEXT NOT NULL,
    `version_id` VARCHAR(100) NOT NULL,
    `internal_url` TEXT NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `pamphlet_qrs_uid_key`(`uid`),
    UNIQUE INDEX `pamphlet_qrs_concert_id_key`(`concert_id`),
    INDEX `pamphlet_qrs_concert_id_idx`(`concert_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flyers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `order_id` INTEGER NOT NULL,
    `concert_id` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `flyers_uid_key`(`uid`),
    UNIQUE INDEX `flyers_order_id_key`(`order_id`),
    UNIQUE INDEX `flyers_concert_id_key`(`concert_id`),
    INDEX `flyers_order_id_idx`(`order_id`),
    INDEX `flyers_concert_id_idx`(`concert_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `stripe_payment_intents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `concert_id` INTEGER NOT NULL,
    `external_id` VARCHAR(255) NOT NULL,
    `client_secret` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `stripe_payment_intents_uid_key`(`uid`),
    UNIQUE INDEX `stripe_payment_intents_external_id_key`(`external_id`),
    INDEX `stripe_payment_intents_concert_id_idx`(`concert_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `group_id` INTEGER NOT NULL,
    `concert_id` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `orders_uid_key`(`uid`),
    UNIQUE INDEX `orders_concert_id_key`(`concert_id`),
    INDEX `orders_group_id_idx`(`group_id`),
    INDEX `orders_concert_id_idx`(`concert_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_stripe_payment_intents` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `order_id` INTEGER NOT NULL,
    `stripe_payment_id` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `order_stripe_payment_intents_uid_key`(`uid`),
    UNIQUE INDEX `order_stripe_payment_intents_order_id_key`(`order_id`),
    UNIQUE INDEX `order_stripe_payment_intents_stripe_payment_id_key`(`stripe_payment_id`),
    INDEX `order_stripe_payment_intents_order_id_idx`(`order_id`),
    INDEX `order_stripe_payment_intents_stripe_payment_id_idx`(`stripe_payment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receipts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `order_id` INTEGER NOT NULL,
    `total_price` INTEGER NOT NULL,
    `subtotal_price` INTEGER NOT NULL,
    `discount_price` INTEGER NOT NULL,
    `tax_price` INTEGER NOT NULL,
    `tax_rate` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `receipts_uid_key`(`uid`),
    UNIQUE INDEX `receipts_order_id_key`(`order_id`),
    INDEX `receipts_order_id_idx`(`order_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `receipt_details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `receipt_id` INTEGER NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price_per_quantity` INTEGER NOT NULL,
    `days_per_quantity` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `receipt_details_uid_key`(`uid`),
    INDEX `receipt_details_receipt_id_idx`(`receipt_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `type` ENUM('PERCENTAGE', 'FIXED') NOT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NOT NULL,
    `value` DECIMAL(10, 2) NOT NULL,
    `condition` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `discounts_condition_key`(`condition`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applied_discounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `order_id` INTEGER NOT NULL,
    `discount_id` INTEGER NOT NULL,
    `actual_discount_price` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `applied_discounts_uid_key`(`uid`),
    INDEX `applied_discounts_order_id_idx`(`order_id`),
    INDEX `applied_discounts_discount_id_idx`(`discount_id`),
    UNIQUE INDEX `applied_discounts_order_id_discount_id_key`(`order_id`, `discount_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `distribution_settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `order_id` INTEGER NOT NULL,
    `flyer_id` INTEGER NOT NULL,
    `facility_id` INTEGER NOT NULL,
    `start_date` DATETIME(0) NOT NULL,
    `end_date` DATETIME(0) NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `distribution_settings_uid_key`(`uid`),
    INDEX `distribution_settings_order_id_idx`(`order_id`),
    INDEX `distribution_settings_flyer_id_idx`(`flyer_id`),
    INDEX `distribution_settings_facility_id_idx`(`facility_id`),
    UNIQUE INDEX `distribution_settings_flyer_id_facility_id_key`(`flyer_id`, `facility_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inserted_images` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `key` VARCHAR(255) NOT NULL,
    `version_id` VARCHAR(100) NOT NULL,
    `origin_pamphlet_id` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `inserted_images_uid_key`(`uid`),
    UNIQUE INDEX `inserted_images_key_origin_pamphlet_id_key`(`key`, `origin_pamphlet_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inserted_flyers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uid` VARCHAR(16) NOT NULL,
    `flyer_id` INTEGER NOT NULL,
    `inserted_image_id` INTEGER NOT NULL,
    `created_at` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    UNIQUE INDEX `inserted_flyers_uid_key`(`uid`),
    UNIQUE INDEX `inserted_flyers_flyer_id_inserted_image_id_key`(`flyer_id`, `inserted_image_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `halls` ADD CONSTRAINT `halls_facility_id_fkey` FOREIGN KEY (`facility_id`) REFERENCES `facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `groups` ADD CONSTRAINT `groups_auth_0_provider_account_id_fkey` FOREIGN KEY (`auth_0_provider_account_id`) REFERENCES `auth_0_provider_accounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `group_discounts` ADD CONSTRAINT `group_discounts_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `concerts` ADD CONSTRAINT `concerts_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `concerts` ADD CONSTRAINT `concerts_hall_id_fkey` FOREIGN KEY (`hall_id`) REFERENCES `halls`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `available_insertion_settings` ADD CONSTRAINT `available_insertion_settings_concert_id_fkey` FOREIGN KEY (`concert_id`) REFERENCES `concerts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `origin_pamphlets` ADD CONSTRAINT `origin_pamphlets_concert_id_fkey` FOREIGN KEY (`concert_id`) REFERENCES `concerts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `edited_pamphlets` ADD CONSTRAINT `edited_pamphlets_concert_id_fkey` FOREIGN KEY (`concert_id`) REFERENCES `concerts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pamphlet_qrs` ADD CONSTRAINT `pamphlet_qrs_concert_id_fkey` FOREIGN KEY (`concert_id`) REFERENCES `concerts`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `flyers` ADD CONSTRAINT `flyers_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flyers` ADD CONSTRAINT `flyers_concert_id_fkey` FOREIGN KEY (`concert_id`) REFERENCES `concerts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `stripe_payment_intents` ADD CONSTRAINT `stripe_payment_intents_concert_id_fkey` FOREIGN KEY (`concert_id`) REFERENCES `concerts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `groups`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_concert_id_fkey` FOREIGN KEY (`concert_id`) REFERENCES `concerts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_stripe_payment_intents` ADD CONSTRAINT `order_stripe_payment_intents_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_stripe_payment_intents` ADD CONSTRAINT `order_stripe_payment_intents_stripe_payment_id_fkey` FOREIGN KEY (`stripe_payment_id`) REFERENCES `stripe_payment_intents`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receipts` ADD CONSTRAINT `receipts_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `receipt_details` ADD CONSTRAINT `receipt_details_receipt_id_fkey` FOREIGN KEY (`receipt_id`) REFERENCES `receipts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applied_discounts` ADD CONSTRAINT `applied_discounts_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applied_discounts` ADD CONSTRAINT `applied_discounts_discount_id_fkey` FOREIGN KEY (`discount_id`) REFERENCES `discounts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `distribution_settings` ADD CONSTRAINT `distribution_settings_facility_id_fkey` FOREIGN KEY (`facility_id`) REFERENCES `facilities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `distribution_settings` ADD CONSTRAINT `distribution_settings_flyer_id_fkey` FOREIGN KEY (`flyer_id`) REFERENCES `flyers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `distribution_settings` ADD CONSTRAINT `distribution_settings_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inserted_images` ADD CONSTRAINT `inserted_images_origin_pamphlet_id_fkey` FOREIGN KEY (`origin_pamphlet_id`) REFERENCES `origin_pamphlets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inserted_flyers` ADD CONSTRAINT `inserted_flyers_flyer_id_fkey` FOREIGN KEY (`flyer_id`) REFERENCES `flyers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inserted_flyers` ADD CONSTRAINT `inserted_flyers_inserted_image_id_fkey` FOREIGN KEY (`inserted_image_id`) REFERENCES `inserted_images`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
