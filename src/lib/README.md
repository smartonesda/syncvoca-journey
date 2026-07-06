# Shared Lib

- `api`: HTTP client dan API adapter per feature.
- `auth`: session state ringan dan helper role.
- `privacy`: cache policy dan helper payload boundary.
- `query`: TanStack Query provider dan query key factory.
- `routes`: definisi route, role surface, dan scaffold halaman.

Query untuk aksi sensitif seperti consent, validation, placement, dan role update tidak boleh optimistic tanpa rollback yang jelas.
