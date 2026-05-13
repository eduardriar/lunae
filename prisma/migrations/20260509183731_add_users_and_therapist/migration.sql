-- CreateEnum
CREATE TYPE "UserState" AS ENUM ('active', 'inactive', 'on_leave');

-- CreateEnum
CREATE TYPE "UserTypes" AS ENUM ('therapist', 'admin', 'recepcionist');

-- AlterTable
ALTER TABLE "reservations" ADD COLUMN     "therapist_id" INTEGER;

-- CreateTable
CREATE TABLE "user_types" (
    "id" SERIAL NOT NULL,
    "name" "UserTypes" NOT NULL,
    "description" VARCHAR(255),
    "permissions" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20),
    "user_type_id" INTEGER NOT NULL,
    "state" "UserState" NOT NULL DEFAULT 'active',
    "specialties" VARCHAR(255),
    "available_schedule" JSONB,
    "biography" TEXT,
    "profile_photo" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_types_name_key" ON "user_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_therapist_id_fkey" FOREIGN KEY ("therapist_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_type_id_fkey" FOREIGN KEY ("user_type_id") REFERENCES "user_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
