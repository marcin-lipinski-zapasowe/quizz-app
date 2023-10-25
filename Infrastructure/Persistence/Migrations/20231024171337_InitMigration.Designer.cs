﻿// <auto-generated />
using System;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Infrastructure.Persistence.Migrations
{
    [DbContext(typeof(SqlServerQuizDbContext))]
    [Migration("20231024171337_InitMigration")]
    partial class InitMigration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.21")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Domain.Entities.AppUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("ProfileImageImageId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.HasIndex("ProfileImageImageId");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Domain.Entities.FavouriteQuiz", b =>
                {
                    b.Property<string>("AppUserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("QuizId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("AppUserId", "QuizId");

                    b.HasIndex("QuizId");

                    b.ToTable("FavouriteQuizzes");
                });

            modelBuilder.Entity("Domain.Entities.Image", b =>
                {
                    b.Property<string>("ImageId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("FullPath")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RelativePath")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ImageId");

                    b.ToTable("Images");
                });

            modelBuilder.Entity("Domain.Entities.LiveSession", b =>
                {
                    b.Property<string>("LiveSessionId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("EmailsInvitationsList")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("GenerateQrCode")
                        .HasColumnType("bit");

                    b.Property<string>("HostConnectionId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HostId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("IsMaxParticipantsNumber")
                        .HasColumnType("bit");

                    b.Property<int>("MaxParticipantsNumber")
                        .HasColumnType("int");

                    b.Property<bool>("OnlyForSigned")
                        .HasColumnType("bit");

                    b.Property<bool>("QuestionsOnHostScreenOnly")
                        .HasColumnType("bit");

                    b.Property<string>("QuizId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<bool>("SendEmailInvitations")
                        .HasColumnType("bit");

                    b.Property<string>("SessionPin")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("ShowScoreAfterAllQuestions")
                        .HasColumnType("bit");

                    b.Property<bool>("ShowScoreAfterEveryQuestion")
                        .HasColumnType("bit");

                    b.HasKey("LiveSessionId");

                    b.HasIndex("HostId");

                    b.HasIndex("QuizId");

                    b.ToTable("Sessions");
                });

            modelBuilder.Entity("Domain.Entities.Opinion", b =>
                {
                    b.Property<string>("OpinionId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AppUserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("QuizId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Text")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Value")
                        .HasPrecision(1)
                        .HasColumnType("float(1)");

                    b.HasKey("OpinionId");

                    b.HasIndex("AppUserId");

                    b.HasIndex("QuizId");

                    b.ToTable("Opinions");
                });

            modelBuilder.Entity("Domain.Entities.Participant", b =>
                {
                    b.Property<string>("ParticipantId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AppUserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConnectionId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LiveSessionId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<double>("Score")
                        .HasColumnType("float");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ParticipantId");

                    b.HasIndex("AppUserId");

                    b.HasIndex("LiveSessionId");

                    b.ToTable("Participant");
                });

            modelBuilder.Entity("Domain.Entities.Question", b =>
                {
                    b.Property<string>("QuestionId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ImageId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("Number")
                        .HasColumnType("int");

                    b.Property<string>("QuizId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("Type")
                        .HasColumnType("int");

                    b.HasKey("QuestionId");

                    b.HasIndex("ImageId");

                    b.HasIndex("QuizId");

                    b.ToTable("Questions");

                    b.HasDiscriminator<string>("Discriminator").HasValue("Question");
                });

            modelBuilder.Entity("Domain.Entities.Quiz", b =>
                {
                    b.Property<string>("QuizId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AuthorId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsPublic")
                        .HasColumnType("bit");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("QuizId");

                    b.HasIndex("AuthorId");

                    b.ToTable("Quizzes");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("Domain.Entities.QuestionsType.QuestionOpen", b =>
                {
                    b.HasBaseType("Domain.Entities.Question");

                    b.HasDiscriminator().HasValue("QuestionOpen");
                });

            modelBuilder.Entity("Domain.Entities.QuestionsType.QuestionRating", b =>
                {
                    b.HasBaseType("Domain.Entities.Question");

                    b.Property<int>("Max")
                        .HasColumnType("int");

                    b.Property<int>("Min")
                        .HasColumnType("int");

                    b.Property<int>("Step")
                        .HasColumnType("int");

                    b.HasDiscriminator().HasValue("QuestionRating");
                });

            modelBuilder.Entity("Domain.Entities.QuestionsType.QuestionSelection", b =>
                {
                    b.HasBaseType("Domain.Entities.Question");

                    b.Property<string>("AnswerA")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AnswerB")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AnswerC")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("AnswerD")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("CorrectAnswers")
                        .HasColumnType("int");

                    b.HasDiscriminator().HasValue("QuestionSelection");
                });

            modelBuilder.Entity("Domain.Entities.QuestionsType.QuestionTrueFalse", b =>
                {
                    b.HasBaseType("Domain.Entities.Question");

                    b.Property<bool>("CorrectAnswer")
                        .HasColumnType("bit");

                    b.HasDiscriminator().HasValue("QuestionTrueFalse");
                });

            modelBuilder.Entity("Domain.Entities.AppUser", b =>
                {
                    b.HasOne("Domain.Entities.Image", "ProfileImage")
                        .WithMany()
                        .HasForeignKey("ProfileImageImageId");

                    b.Navigation("ProfileImage");
                });

            modelBuilder.Entity("Domain.Entities.FavouriteQuiz", b =>
                {
                    b.HasOne("Domain.Entities.AppUser", "AppUser")
                        .WithMany("FavouriteQuizzes")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.Quiz", "Quiz")
                        .WithMany("AppUsersFavourite")
                        .HasForeignKey("QuizId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");

                    b.Navigation("Quiz");
                });

            modelBuilder.Entity("Domain.Entities.LiveSession", b =>
                {
                    b.HasOne("Domain.Entities.AppUser", "Host")
                        .WithMany()
                        .HasForeignKey("HostId");

                    b.HasOne("Domain.Entities.Quiz", "Quiz")
                        .WithMany("Sessions")
                        .HasForeignKey("QuizId");

                    b.Navigation("Host");

                    b.Navigation("Quiz");
                });

            modelBuilder.Entity("Domain.Entities.Opinion", b =>
                {
                    b.HasOne("Domain.Entities.AppUser", "AppUser")
                        .WithMany("Opinions")
                        .HasForeignKey("AppUserId");

                    b.HasOne("Domain.Entities.Quiz", "Quiz")
                        .WithMany("Opinions")
                        .HasForeignKey("QuizId");

                    b.Navigation("AppUser");

                    b.Navigation("Quiz");
                });

            modelBuilder.Entity("Domain.Entities.Participant", b =>
                {
                    b.HasOne("Domain.Entities.AppUser", "AppUser")
                        .WithMany()
                        .HasForeignKey("AppUserId");

                    b.HasOne("Domain.Entities.LiveSession", null)
                        .WithMany("Participants")
                        .HasForeignKey("LiveSessionId");

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("Domain.Entities.Question", b =>
                {
                    b.HasOne("Domain.Entities.Image", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId");

                    b.HasOne("Domain.Entities.Quiz", "Quiz")
                        .WithMany("Questions")
                        .HasForeignKey("QuizId");

                    b.Navigation("Image");

                    b.Navigation("Quiz");
                });

            modelBuilder.Entity("Domain.Entities.Quiz", b =>
                {
                    b.HasOne("Domain.Entities.AppUser", "Author")
                        .WithMany("Quizzes")
                        .HasForeignKey("AuthorId");

                    b.Navigation("Author");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Domain.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Domain.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Domain.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Domain.Entities.AppUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Entities.AppUser", b =>
                {
                    b.Navigation("FavouriteQuizzes");

                    b.Navigation("Opinions");

                    b.Navigation("Quizzes");
                });

            modelBuilder.Entity("Domain.Entities.LiveSession", b =>
                {
                    b.Navigation("Participants");
                });

            modelBuilder.Entity("Domain.Entities.Quiz", b =>
                {
                    b.Navigation("AppUsersFavourite");

                    b.Navigation("Opinions");

                    b.Navigation("Questions");

                    b.Navigation("Sessions");
                });
#pragma warning restore 612, 618
        }
    }
}
