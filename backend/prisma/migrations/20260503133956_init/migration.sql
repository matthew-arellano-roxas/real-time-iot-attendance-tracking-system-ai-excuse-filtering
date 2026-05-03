-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('PRESENT', 'ABSENT', 'LATE', 'EXCUSED');

-- CreateEnum
CREATE TYPE "ClassStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'ARCHIVED', 'SUSPENDED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "Mode" AS ENUM ('IN_ONLY', 'IN_AND_OUT');

-- CreateEnum
CREATE TYPE "DeviceStatus" AS ENUM ('PENDING', 'PAIRING', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'REVOKED', 'OFFLINE');

-- CreateEnum
CREATE TYPE "OAuthProvider" AS ENUM ('GOOGLE', 'GITHUB', 'FACEBOOK');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'EDUCATOR', 'STUDENT');

-- CreateTable
CREATE TABLE "attendance_logs" (
    "id" SERIAL NOT NULL,
    "student_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "device_id" INTEGER,
    "class_schedule_id" INTEGER NOT NULL,
    "status" "AttendanceStatus" NOT NULL,
    "time_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "time_out" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attendance_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "allow_joins" BOOLEAN NOT NULL,
    "join_code" TEXT,
    "school_year" TEXT NOT NULL,
    "status" "ClassStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "educator_id" INTEGER NOT NULL,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_config_settings" (
    "id" SERIAL NOT NULL,
    "class_id" INTEGER NOT NULL,
    "absences_before_warning" INTEGER NOT NULL,
    "grace_period_mins" INTEGER NOT NULL,
    "mode" "Mode" NOT NULL,
    "allow_excuse_submission" BOOLEAN NOT NULL,
    "excuse_deadline_hours" TIMESTAMP(3) NOT NULL,
    "require_attachment" BOOLEAN NOT NULL,
    "auto_approve_excuse" BOOLEAN NOT NULL,
    "ai_verdict" BOOLEAN NOT NULL,

    CONSTRAINT "class_config_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "class_schedules" (
    "id" SERIAL NOT NULL,
    "class_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "device_id" INTEGER,

    CONSTRAINT "class_schedules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "devices" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mac_address" TEXT NOT NULL,
    "firmware_version" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "status" "DeviceStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "devices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "device_logs" (
    "id" SERIAL NOT NULL,
    "device_id" INTEGER NOT NULL,
    "event_type" TEXT NOT NULL,
    "occurred_at" TIMESTAMP(3) NOT NULL,
    "status" "DeviceStatus" NOT NULL,

    CONSTRAINT "device_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "excuse_requests" (
    "id" SERIAL NOT NULL,
    "file_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "student_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "submitted_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "reviewed_by" TEXT NOT NULL,
    "reviewed_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "excuse_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "class_id" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar_url" TEXT,
    "oauth_provider" "OAuthProvider" NOT NULL,
    "oauth_provider_id" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "attendance_logs_student_id_idx" ON "attendance_logs"("student_id");

-- CreateIndex
CREATE INDEX "attendance_logs_class_id_class_schedule_id_created_at_devic_idx" ON "attendance_logs"("class_id", "class_schedule_id", "created_at", "device_id");

-- CreateIndex
CREATE UNIQUE INDEX "classes_join_code_key" ON "classes"("join_code");

-- CreateIndex
CREATE INDEX "classes_educator_id_idx" ON "classes"("educator_id");

-- CreateIndex
CREATE UNIQUE INDEX "class_config_settings_class_id_key" ON "class_config_settings"("class_id");

-- CreateIndex
CREATE INDEX "class_schedules_class_id_start_time_device_id_idx" ON "class_schedules"("class_id", "start_time", "device_id");

-- CreateIndex
CREATE INDEX "devices_owner_id_idx" ON "devices"("owner_id");

-- CreateIndex
CREATE INDEX "device_logs_device_id_idx" ON "device_logs"("device_id");

-- CreateIndex
CREATE INDEX "device_logs_occurred_at_event_type_device_id_idx" ON "device_logs"("occurred_at", "event_type", "device_id");

-- CreateIndex
CREATE UNIQUE INDEX "excuse_requests_file_url_key" ON "excuse_requests"("file_url");

-- CreateIndex
CREATE INDEX "excuse_requests_class_id_student_id_submitted_at_idx" ON "excuse_requests"("class_id", "student_id", "submitted_at");

-- CreateIndex
CREATE INDEX "excuse_requests_class_id_submitted_at_idx" ON "excuse_requests"("class_id", "submitted_at");

-- CreateIndex
CREATE INDEX "students_class_id_user_id_idx" ON "students"("class_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_oauth_provider_id_key" ON "users"("oauth_provider_id");

-- CreateIndex
CREATE INDEX "users_oauth_provider_id_idx" ON "users"("oauth_provider_id");

-- AddForeignKey
ALTER TABLE "attendance_logs" ADD CONSTRAINT "attendance_logs_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_logs" ADD CONSTRAINT "attendance_logs_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_logs" ADD CONSTRAINT "attendance_logs_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "attendance_logs" ADD CONSTRAINT "attendance_logs_class_schedule_id_fkey" FOREIGN KEY ("class_schedule_id") REFERENCES "class_schedules"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "classes" ADD CONSTRAINT "classes_educator_id_fkey" FOREIGN KEY ("educator_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_config_settings" ADD CONSTRAINT "class_config_settings_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedules" ADD CONSTRAINT "class_schedules_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "class_schedules" ADD CONSTRAINT "class_schedules_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "devices" ADD CONSTRAINT "devices_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "device_logs" ADD CONSTRAINT "device_logs_device_id_fkey" FOREIGN KEY ("device_id") REFERENCES "devices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "excuse_requests" ADD CONSTRAINT "excuse_requests_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "excuse_requests" ADD CONSTRAINT "excuse_requests_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
