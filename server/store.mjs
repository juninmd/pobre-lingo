import pg from "pg";

/** Contrato dos stores: get, put, remove, ping. */
export function createPgStore(connectionString) {
	const pool = new pg.Pool({ connectionString, max: 5 });

	const toRow = (row) => ({
		data: row.data,
		version: row.version,
		updatedAt: row.updated_at.toISOString(),
	});

	const get = async (id) => {
		const { rows } = await pool.query(
			"SELECT data, version, updated_at FROM progress WHERE id = $1",
			[id],
		);
		return rows[0] ? toRow(rows[0]) : null;
	};

	return {
		async init() {
			await pool.query(`CREATE TABLE IF NOT EXISTS progress (
				id text PRIMARY KEY,
				data jsonb NOT NULL,
				version integer NOT NULL DEFAULT 1,
				updated_at timestamptz NOT NULL DEFAULT now()
			)`);
		},
		get,
		/** Concorrência otimista: só grava se baseVersion for a versão atual. */
		async put(id, data, baseVersion) {
			const sql =
				baseVersion === 0
					? `INSERT INTO progress (id, data) VALUES ($1, $2)
						ON CONFLICT DO NOTHING RETURNING data, version, updated_at`
					: `UPDATE progress SET data = $2, version = version + 1, updated_at = now()
						WHERE id = $1 AND version = $3 RETURNING data, version, updated_at`;
			const params =
				baseVersion === 0 ? [id, data] : [id, data, baseVersion];
			const { rows } = await pool.query(sql, params);
			if (rows[0]) return { ok: true, ...toRow(rows[0]) };
			return { ok: false, current: await get(id) };
		},
		async remove(id) {
			await pool.query("DELETE FROM progress WHERE id = $1", [id]);
		},
		async ping() {
			await pool.query("SELECT 1");
		},
		close: () => pool.end(),
	};
}
