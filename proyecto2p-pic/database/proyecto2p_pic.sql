--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-07-10 14:51:35

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 57605)
-- Name: empleados; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empleados (
    id_empleado integer NOT NULL,
    nombre character varying(100),
    puesto character varying(100),
    salario numeric
);


ALTER TABLE public.empleados OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 57604)
-- Name: empleados_id_empleado_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empleados_id_empleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.empleados_id_empleado_seq OWNER TO postgres;

--
-- TOC entry 4818 (class 0 OID 0)
-- Dependencies: 217
-- Name: empleados_id_empleado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empleados_id_empleado_seq OWNED BY public.empleados.id_empleado;


--
-- TOC entry 222 (class 1259 OID 57621)
-- Name: participaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.participaciones (
    id_participacion integer NOT NULL,
    id_empleado integer,
    id_proyecto integer,
    rol character varying(100)
);


ALTER TABLE public.participaciones OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 57620)
-- Name: participaciones_id_participacion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.participaciones_id_participacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.participaciones_id_participacion_seq OWNER TO postgres;

--
-- TOC entry 4819 (class 0 OID 0)
-- Dependencies: 221
-- Name: participaciones_id_participacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.participaciones_id_participacion_seq OWNED BY public.participaciones.id_participacion;


--
-- TOC entry 220 (class 1259 OID 57614)
-- Name: proyectos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proyectos (
    id_proyecto integer NOT NULL,
    nombre_proyecto character varying(100),
    fecha_inicio date,
    fecha_fin date
);


ALTER TABLE public.proyectos OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 57613)
-- Name: proyectos_id_proyecto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proyectos_id_proyecto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proyectos_id_proyecto_seq OWNER TO postgres;

--
-- TOC entry 4820 (class 0 OID 0)
-- Dependencies: 219
-- Name: proyectos_id_proyecto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proyectos_id_proyecto_seq OWNED BY public.proyectos.id_proyecto;


--
-- TOC entry 4651 (class 2604 OID 57608)
-- Name: empleados id_empleado; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados ALTER COLUMN id_empleado SET DEFAULT nextval('public.empleados_id_empleado_seq'::regclass);


--
-- TOC entry 4653 (class 2604 OID 57624)
-- Name: participaciones id_participacion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participaciones ALTER COLUMN id_participacion SET DEFAULT nextval('public.participaciones_id_participacion_seq'::regclass);


--
-- TOC entry 4652 (class 2604 OID 57617)
-- Name: proyectos id_proyecto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos ALTER COLUMN id_proyecto SET DEFAULT nextval('public.proyectos_id_proyecto_seq'::regclass);


--
-- TOC entry 4808 (class 0 OID 57605)
-- Dependencies: 218
-- Data for Name: empleados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.empleados (id_empleado, nombre, puesto, salario) FROM stdin;
3	rafael	socio	7
\.


--
-- TOC entry 4812 (class 0 OID 57621)
-- Dependencies: 222
-- Data for Name: participaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.participaciones (id_participacion, id_empleado, id_proyecto, rol) FROM stdin;
1	3	1	programador
\.


--
-- TOC entry 4810 (class 0 OID 57614)
-- Dependencies: 220
-- Data for Name: proyectos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proyectos (id_proyecto, nombre_proyecto, fecha_inicio, fecha_fin) FROM stdin;
1	proyecto pic	2025-07-11	2025-07-31
\.


--
-- TOC entry 4821 (class 0 OID 0)
-- Dependencies: 217
-- Name: empleados_id_empleado_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empleados_id_empleado_seq', 3, true);


--
-- TOC entry 4822 (class 0 OID 0)
-- Dependencies: 221
-- Name: participaciones_id_participacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.participaciones_id_participacion_seq', 1, true);


--
-- TOC entry 4823 (class 0 OID 0)
-- Dependencies: 219
-- Name: proyectos_id_proyecto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proyectos_id_proyecto_seq', 1, true);


--
-- TOC entry 4655 (class 2606 OID 57612)
-- Name: empleados empleados_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empleados
    ADD CONSTRAINT empleados_pkey PRIMARY KEY (id_empleado);


--
-- TOC entry 4659 (class 2606 OID 57626)
-- Name: participaciones participaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participaciones
    ADD CONSTRAINT participaciones_pkey PRIMARY KEY (id_participacion);


--
-- TOC entry 4657 (class 2606 OID 57619)
-- Name: proyectos proyectos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (id_proyecto);


--
-- TOC entry 4660 (class 2606 OID 57627)
-- Name: participaciones participaciones_id_empleado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participaciones
    ADD CONSTRAINT participaciones_id_empleado_fkey FOREIGN KEY (id_empleado) REFERENCES public.empleados(id_empleado);


--
-- TOC entry 4661 (class 2606 OID 57632)
-- Name: participaciones participaciones_id_proyecto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participaciones
    ADD CONSTRAINT participaciones_id_proyecto_fkey FOREIGN KEY (id_proyecto) REFERENCES public.proyectos(id_proyecto);


-- Completed on 2025-07-10 14:51:36

--
-- PostgreSQL database dump complete
--

