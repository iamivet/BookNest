using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookNest.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddCatalodNumberToBooks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CatalogNumber",
                table: "Books",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CatalogNumber",
                table: "Books");
        }
    }
}
