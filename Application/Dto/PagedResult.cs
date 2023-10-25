using Microsoft.EntityFrameworkCore;

namespace Application.Dto;

public class PagedResult<T>
{
    public List<T> Items { get; set; }
    private const int PageSize = 4;
    public int Page { get; init; }
    public int PagesAmount { get; init; }
    public bool HasPreviousPage => Page > 1;
    public bool HasNextPage => Page < PagesAmount;

    public static async Task<PagedResult<T>> CreateAsync(IQueryable<T> query, int page)
    {
        return new PagedResult<T>
        {
            PagesAmount = (int)Math.Ceiling(await query.CountAsync() / (decimal)PageSize),
            Page = page,
            Items = await query.Skip((page - 1) * PageSize).Take(PageSize).ToListAsync()
        };
    }
}